import express from "express";
import authController from "../controllers/auth.ts";
import { authMiddleware } from "../middlewares/auth.ts";
import passport from "../config/passport.ts";
import JWT from "jsonwebtoken";
import { env } from "../config/env.ts";

const authRouter = express.Router();

authRouter.post("/signup", authController.signup);
authRouter.post("/login", authController.login);

// authRouter.get(
//     "/google",
//     passport.authenticate("google", { scope: ["profile", "email"] })
// );
  
// authRouter.get(
//     "/google/callback",
//     passport.authenticate("google", { failureRedirect: "/login-failed", session: false }),
//     (req, res) => {
//       const user = req.user as any;
//       const token = JWT.sign({ id: user._id }, env.JWT_SECRET!, { expiresIn: "1h" });
//       res.redirect(`${env.FRONT_URL}/auth/success?token=${token}`);
//     }
// );
  
authRouter.get("/user", authMiddleware, authController.getUser);

export default authRouter;