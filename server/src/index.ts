import express from "express";
import { env } from "./config/env.ts";
import { authRouter, userRouter, quizRouter } from "./routes/index.ts";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

import { connectDB, disconnectDb } from "./config/db.ts";

const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(cors({
    origin: env.FRONT_URL,
    credentials: true
}));

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/quiz", quizRouter);

// Swagger setup
const swaggerDocument = YAML.load("./src/docs/swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const startServer = async () => {
  try {
    await connectDB();
    const URL = `${env.BASE_URL}:${env.PORT}`;
    const SWAGGER = `${env.BASE_URL}:${env.PORT}/api-docs`
    app.listen(env.PORT, () => console.log(`Server running at ${URL}, ${SWAGGER}`));
  } catch (err) {
    console.error("Failed to connect to DB", err);
    process.exit(1);
  }
};

startServer();

process.on('SIGTERM', () => disconnectDb());
process.on('SIGINT', () => disconnectDb());
