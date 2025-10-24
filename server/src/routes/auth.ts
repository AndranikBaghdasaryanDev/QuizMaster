import express from "express";
import userController from "../controllers/user.ts";
import { authMiddleware } from "../middlewares/auth.ts";

const authRouter = express.Router();

authRouter.post("/signup", userController.signup);
authRouter.post("/login", userController.login);
authRouter.post("/verify", userController.verifyEmail);

authRouter.get("/user", authMiddleware, userController.getUser);
export default authRouter;