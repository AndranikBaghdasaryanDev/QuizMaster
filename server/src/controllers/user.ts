import { env } from "../config/env.ts";
import { User } from "../models/index.ts";
import type { Request, Response } from "express";
import validator from "../lib/validator.ts";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { sendMail } from "../lib/mail.ts";
import { getForgotPasswordTemplate } from "../lib/templates/forgotPassword.ts";

class UserController {
  async verifyEmail(req: Request, res: Response) {
    if (!req.body) {
      return res
        .status(400)
        .send({ error: true, message: "Payload is required" });
    }
    const { token } = req.body;
    if (!token) {
      return res.status(400).send({ error: true, message: "Invalid payload" });
    }
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      verifyToken: hashedToken,
      verifyExpires: { $gt: new Date() },
    });

    if (!user) {
      return res
        .status(400)
        .send({ error: true, message: "Invalid/expired token" });
    }

    user.isVerified = true;
    user.verifyToken = null;
    user.verifyExpires = null;
    await user.save();

    return res.send({ error: false, message: "Successfully verified" });
  }

  async forgotPassword(req: Request, res: Response) {
    try {
      if (!req.body) {
        return res
          .status(400)
          .send({ error: true, message: "Payload is required" });
      }
      const { email } = req.body;
      if (!email) {
        return res
          .status(400)
          .send({ error: true, message: "Invalid payload" });
      }
      const user = await User.findOne({ email });
      if (user && !user.isVerified) {
        return res
          .status(400)
          .send({
            error: true,
            message: "Before changing password you need to verify your email",
          });
      }
      if (user) {
        const rawToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = crypto
          .createHash("sha256")
          .update(rawToken)
          .digest("hex");
        user.resetToken = hashedToken;
        user.resetExpires = new Date(
          Date.now() + Number(env.TOKEN_EXPIRE_TIME)
        );
        await user.save();
        await sendMail(
          user.email,
          "Forgot Password",
          getForgotPasswordTemplate(user.name, rawToken)
        );
      }
      return res.send({
        error: false,
        message:
          "The link for reseting the password was sent to your email. Please enter by that link and change your password.",
      });
    } catch (err) {
      return res
        .status(500)
        .send({ error: true, message: "Server error", payload: err });
    }
  }
  async resetPassword(req: Request, res: Response) {
    try {
      if (!req.body) {
        return res
          .status(400)
          .send({ error: true, message: "Payload is required" });
      }
      const { token, password } = req.body;
      if (!token) {
        return res
          .status(400)
          .send({ error: true, message: "Invalid payload" });
      }
      const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");
      const user = await User.findOne({
        resetToken: hashedToken,
        resetExpires: { $gt: new Date() },
      });
      if (!user) {
        return res
          .status(404)
          .send({ error: true, message: "Invalid/expired token" });
      }
      if (!password || !validator.isValidPassword(password)) {
        return res
          .status(400)
          .send({
            error: true,
            message:
              "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character (#?!@$ %^&*-).",
          });
      }
      user.password = await bcrypt.hash(password, 10);
      user.resetToken = null;
      user.resetExpires = null;
      await user.save();
      return res.send({
        error: false,
        message: "Your password got reset successfully",
      });
    } catch (err) {
      return res
        .status(500)
        .send({ error: true, message: "Server error", payload: err });
    }
  }
}

export default new UserController();
