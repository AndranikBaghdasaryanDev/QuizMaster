import type { Request, Response, NextFunction } from "express";
import JWT from "jsonwebtoken";
import { env } from "../config/env.ts";
import { User } from "../models/index.ts";
export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(403)
      .send({ error: true, message: "Authorization header is required" });
  }

  const [scheme, token] = authHeader.split(" ");

  if (scheme != "Bearer") {
    return res.status(402).send({ error: true, message: "Invalid header" });
  }
  
  if (!token) {
    return res.status(403).send({ error: true, message: "Invalid/expired token" });
  }
  const decoded = JWT.verify(token, env.JWT_SECRET as string);

  if (typeof decoded === "string" || !("id" in decoded)) {
    return res.status(401).send({ error: true, message: "Invalid token" });
  }

  const user = await User.findById(decoded.id).select("-password -verifyToken -verifyExpires");

  if (!user) {
    return res.status(404).send({ error: true, message: "Not found" });
  }

  req.user = user;
  next();
};
