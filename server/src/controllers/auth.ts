import validator from "../lib/validator.ts";
import type { Request, Response } from "express";
import { User } from "../models/index.ts";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { sendMail } from "../lib/mail.ts";
import { getVerifyEmailTemplate } from "../lib/templates/verifyEmail.ts";
import { env } from "../config/env.ts";
import JWT from "jsonwebtoken";

class AuthController {
    async signup(req: Request, res: Response) {
        if (!req.body) {
            return res.status(400).send({ error: true, message: "Payload is required." });
        }

        let { name, username, email, password } = req.body;
        
        if (!name || !validator.isValidLen(name)) {
            return res.status(400).send({ error: true, message: "Name must be 2-100 cahracter long." });
        }

        if (!username || !validator.isValidUsername(username)) {
            return res.status(400).send({ error: true, message: "Username should contain only lowercase letters, digits, underscores and hyphens with length 3-15 character." });
        }

        if (!email || !validator.isValidEmail(email)) {
            return res.status(400).send({ error: true, message: "Invalid email." });
        }

        const user = await User.findOne({ 
            $or: [
                { email: email },
                { username: username }
            ]
        });

        if (user) {
            return res.status(400).send({ error: true, message: "Email/Username is busy" });
        }

        if (!password || !validator.isValidPassword(password)) {
            return res.status(400).send({ error: true, message: "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character (#?!@$ %^&*-)." });
        }
        
        try {
            password = await bcrypt.hash(password, 10);
            const rawToken = crypto.randomBytes(32).toString("hex");
            const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");
            const user = await User.create({
                name, username, email, password,
                verifyToken: hashedToken,
                verifyExpires: new Date(
                    Date.now() + Number(env.TOKEN_EXPIRE_TIME)
                )
            });

            await sendMail(
                email,
                "Verify your Quiz Master Account",
                getVerifyEmailTemplate(name, rawToken)
            );
              
            return res.status(201).send({ error: false, message: "Please verify your email to complete registration.", payload: user._id });
        } catch(err) {
            return res.status(500).send({ error: true, message: "Server error", payload: err });
        }

    }
    
    async login(req: Request, res: Response) {
        if (!req.body) {
            return res.status(400).send({ error: true, message: "Payload is required" });
        }
        const { email, password } = req.body;
        if (!email || !validator.isValidEmail(email)) {
            return res.status(400).send({ error: true, message: "Invalid email" });
        }
        if (!password) {
            return res.status(400).send({ error: true, message: "Invalid payload" });
        }
        try { 

            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).send({ error: true, message: "Invalid credentials" });
            }
            if (!user.isVerified) {
                return res.status(403).send({ error: true, message: "Please verify your email before logging in" });
            }
            // Check if user signed up with Google OAuth (no password)
            if (!user.password) {
                return res.status(400).send({ error: true, message: "This account was created with Google. Please sign in with Google." });
            }
            const isValid = await bcrypt.compare(password, user.password);
            if (!isValid) {
                return res.status(400).send({ error: true, message: "Invalid credentials" });
            }
            const token = JWT.sign({ id: user._id.toString() }, env.JWT_SECRET as string, { expiresIn: '1h' });
            return res.send({ error: false, message: "Success", payload: { token } });
        } catch(err) {
            return res.status(500).send({ error: true, message: "Server error", payload: err });
        }
    }
    
    async getUser(req: Request, res: Response) {
        return res.send({ error: false, message: "Success", payload: { user: req.user } });
    }
}

export default new AuthController();