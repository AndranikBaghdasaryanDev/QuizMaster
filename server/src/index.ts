import express from "express";
import { env } from "./config/env.ts";
import authRouter from "./routes/auth.ts";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

import { connectDB, disconnectDb } from "./config/db.ts";
import userRouter from "./routes/user.ts";

const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(cors({
    origin: env.FRONT_URL,
    credentials: true
}));
app.use("/auth", authRouter);
app.use("/user", userRouter);
// Swagger setup
const swaggerDocument = YAML.load("./src/docs/swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const startServer = async () => {
  try {
    await connectDB();
    const URL = `${env.BASE_URL}:${env.PORT}`;
    app.listen(env.PORT, () => console.log(`Server running at ${URL}`));
  } catch (err) {
    console.error("Failed to connect to DB", err);
    process.exit(1);
  }
};

startServer();

process.on('SIGTERM', () => disconnectDb());
process.on('SIGINT', () => disconnectDb());
