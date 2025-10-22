import express from "express";
import { env } from "./lib/env.ts";
import authRouter from "./routes/auth.ts";
import cors from "cors";

const app = express();


app.get("/", (req, res) => res.send({ message: "Hello" }));

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());
app.use("/auth", authRouter);

const URL = `${env.BASE_URL}:${env.PORT || 4002}`;

app.listen(env.PORT, () => console.log(URL));