import express from "express";
import authController from "../controllers/auth.ts";
import { authMiddleware } from "../middlewares/auth.ts";

const authRouter = express.Router();

authRouter.post("/signup", authController.signup);
authRouter.post("/login", authController.login);

authRouter.get("/user", authMiddleware, authController.getUser);

export default authRouter;