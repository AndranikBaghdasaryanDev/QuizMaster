import JWT from "jsonwebtoken";
import { env } from "../config/env.ts";
import { User } from "../models/index.ts";
import type { Request, Response } from "express";
import validator from "../lib/validator.ts";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { sendMail } from "../lib/mail.ts";

class UserController {
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
                verifyExpires: Date.now() + 1000 * 60 * 20, // 20 minutes
            });

            await sendMail(
                email,
                "Verify your Quiz Master Account",
                `
                <!DOCTYPE html>
                    <html lang="en">
                    <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Verify Your Account</title>
                    <style>
                        /* --- General Reset --- */
                        body {
                        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
                        background-color: #f5f7fa;
                        margin: 0;
                        padding: 0;
                        color: #333333;
                        }

                        .container {
                        max-width: 600px;
                        margin: 40px auto;
                        background: #ffffff;
                        border-radius: 10px;
                        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
                        overflow: hidden;
                        }

                        /* --- Header --- */
                        .header {
                        background: linear-gradient(90deg, #5813C1 0%, #C45037 100%);
                        color: #ffffff;
                        text-align: center;
                        padding: 24px;
                        font-size: 24px;
                        font-weight: 700;
                        letter-spacing: 0.5px;
                        }

                        /* --- Content --- */
                        .content {
                        padding: 32px 28px;
                        line-height: 1.7;
                        }

                        .content h2 {
                        margin-top: 0;
                        color: #111;
                        font-size: 20px;
                        font-weight: 700;
                        }

                        .content p {
                        margin-bottom: 16px;
                        }

                        /* --- Button --- */
                        .button {
                        display: inline-block;
                        margin-top: 20px;
                        padding: 12px 28px;
                        background: linear-gradient(90deg, #5813C1 0%, #C45037 100%);
                        color: #fff !important;
                        text-decoration: none;
                        border-radius: 6px;
                        font-weight: 600;
                        letter-spacing: 0.3px;
                        }

                        .button:hover {
                        opacity: 0.9;
                        }

                        /* --- Fallback Link --- */
                        .link {
                        font-size: 13px;
                        color: #5813C1;
                        word-break: break-all;
                        }

                        /* --- Footer --- */
                        .footer {
                        text-align: center;
                        padding: 20px;
                        background: #fafafa;
                        font-size: 12px;
                        color: #777777;
                        border-top: 1px solid #eeeeee;
                        }

                        @media only screen and (max-width: 600px) {
                        .container {
                            margin: 20px;
                        }
                        .content {
                            padding: 24px 20px;
                        }
                        }
                    </style>
                    </head>
                    <body>
                    <div class="container">
                        <div class="header">Quiz Master</div>

                        <div class="content">
                        <h2>Welcome, ${name}!</h2>
                        <p>Thank you for joining Quiz Master. Please verify your email address to activate your account.</p>
                        <a href="${env.FRONT_URL}/verify?token=${hashedToken}" class="button">Verify Email</a>

                        <p style="margin-top: 25px;">If the button doesn’t work, copy and paste this link into your browser:</p>
                        <p class="link">${env.FRONT_URL}/verify?token=${hashedToken}</p>
                        </div>

                        <div class="footer">
                        &copy; ${new Date().getFullYear()} Quiz Master. All rights reserved.
                        </div>
                    </div>
                    </body>
                    </html>
                `
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
        console.log("logging in...");
        try { 

            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).send({ error: true, message: "Invalid credentials" });
            }
            if (!user.isVerified) {
                return res.status(403).send({ error: true, message: "Please verify your email before logging in" });
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
        console.log(req.user);
        return res.send({ error: false, message: "Success", payload: { user: req.user } });
    }
}

export default new UserController();