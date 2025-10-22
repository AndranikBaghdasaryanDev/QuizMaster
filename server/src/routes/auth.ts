import express from "express";
import userController from "../controllers/user.ts";

const authRouter = express.Router();

authRouter.post("/signup", userController.signup);
authRouter.post("/login", userController.login);
authRouter.get("/user", userController.getUser);

export default authRouter;