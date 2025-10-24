import express from "express";
import userController from "../controllers/user.ts";

const userRouter = express.Router();

userRouter.post("/verify", userController.verifyEmail);
userRouter.post("/forgot", userController.forgotPassword);
userRouter.post("/reset", userController.resetPassword);

export default userRouter;