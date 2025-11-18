import type { IUser } from "./user.ts";
import "express-serve-static-core";

declare module "express-serve-static-core" {
    interface Request {
        userId?: string;
        user?: Omit<IUser, "password" | "verifyToken" | "verifyExpires">;
    }
}

export {};