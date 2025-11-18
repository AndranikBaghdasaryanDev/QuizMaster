import express from "express";
import levelController from "../controllers/level.ts";

const levelRouter = express.Router();

levelRouter.get("/", levelController.getAllLevel);

export default levelRouter;