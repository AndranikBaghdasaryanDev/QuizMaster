import JWT from "jsonwebtoken";
import { env } from "process";
import { User } from "../models/index.ts";
import type { Request, Response } from "express";

class UserController {
    async signup(req: Request, res: Response) {
    }
    
    async login(req: Request, res: Response) {
    }
    
    async getUser(req: Request, res: Response) {
        try {   
            const user = await User.findById(req.userId).select("-password");
            if (!user) {
                return res.status(404).send({ error: true, message: "User not found" });
            }
            const token = JWT.sign({ id: user._id.toString() }, env.JWT_SECRET as string, { expiresIn: '1h' });
            return res.send({ error: false, message: "Success", payload: { token } });
        } catch (err) {
            return res.status(500).send({ error: true, message: "Server error", payload: { err } });
        }
    }
}

export default new UserController();