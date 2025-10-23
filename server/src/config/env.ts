import dotenv from "dotenv";
dotenv.config();

export interface Env {
  BASE_URL: string;
  FRONT_URL: string;
  PORT: string;
  MONGO_URI: string;
  JWT_SECRET: string;
  EMAIL_USER: string;
  EMAIL_FROM: string;
  EMAIL_PASS: string;
  [key: string]: string; // for any other vars
}

export const env: Env = {
  BASE_URL: process.env.BASE_URL ?? "http://localhost",
  FRONT_URL: process.env.FRONT_URL ?? "http://localhost:3000",
  PORT: process.env.PORT ?? "4002",
  MONGO_URI: process.env.MONGO_URI ?? "",
  JWT_SECRET: process.env.JWT_SECRET ?? "fallback-secret",
  EMAIL_USER: process.env.EMAIL_USER ?? "",
  EMAIL_FROM: process.env.EMAIL_FROM ?? "",
  EMAIL_PASS: process.env.EMAIL_PASS ?? "",
};
