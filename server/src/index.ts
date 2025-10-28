import express, { type Request, type Response, type NextFunction } from "express";
import { env } from "./config/env.ts";
import { authRouter, userRouter, quizRouter, categoryRouter } from "./routes/index.ts";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import { connectDB, disconnectDb } from "./config/db.ts";

const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(cors({
    origin: env.FRONT_URL,
    credentials: true
}));

import { fileURLToPath } from "url";
import multer from "multer";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/quiz", quizRouter);
app.use("/category", categoryRouter);

app.get("/", (req, res) => {
  res.send({ error: false, message: "API is working" });
});

// Swagger setup
const swaggerDocument = YAML.load("./src/docs/swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: true, message: err.message });
  } else if (err) {
      return res.status(500).json({ error: true, message: err.message || "Server error" });
  }
  next();
});

const startServer = async () => {
  try {
    await connectDB();
    const URL = `${env.BASE_URL}:${env.PORT}`;
    const SWAGGER = `${env.BASE_URL}:${env.PORT}/api-docs`
    app.listen(env.PORT, () => console.log(`Server running at ${URL}, ${SWAGGER}`));
  } catch (err) {
    console.error("Failed to connect to DB", err);
    process.exit(1);
  }
};

startServer();

process.on('SIGTERM', () => disconnectDb());
process.on('SIGINT', () => disconnectDb());
