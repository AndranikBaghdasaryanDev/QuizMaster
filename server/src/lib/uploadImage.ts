import multer, { type FileFilterCallback } from "multer";
import path from "path";
import fs from "fs";
import crypto from "crypto";

interface UploadField {
  name: string;      // field name from the form
  maxCount?: number;  // optional, if multiple files
  folder: string;     // subfolder inside public/uploads
}

// Ensure folder exists
const createFolder = (folderPath: string) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
};

// Storage generator for a specific folder
const storage = (subFolder: string) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      const folderPath = path.join("public/uploads", subFolder);
      createFolder(folderPath);
      cb(null, folderPath);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const name = `${Date.now()}-${crypto.randomBytes(16).toString("hex")}${ext}`;
      cb(null, name);
    },
  });

// Only accept images
const imageFilter = (req: any, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("Only image files are allowed!"));
  }
  cb(null, true);
};

/**
 * Create a multer instance that handles multiple fields, each with its own folder
 */
export const upload = (fields: UploadField[]) => {
  const multerFields = fields.map(f => ({
    name: f.name,
    maxCount: f.maxCount ?? 1
  }));

  // For each file, dynamically choose storage based on the field name
  const dynamicStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      const field = fields.find(f => f.name === file.fieldname);
      const folderPath = path.join("public/uploads", field?.folder || "");
      createFolder(folderPath);
      cb(null, folderPath);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const name = `${Date.now()}-${crypto.randomBytes(16).toString("hex")}${ext}`;
      cb(null, name);
    },
  });

  return multer({ storage: dynamicStorage, fileFilter: imageFilter }).fields(multerFields);
};
