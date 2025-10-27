import express from "express";
import quizController from "../controllers/quiz.ts";
import { authMiddleware } from "../middlewares/auth.ts";

const quizRouter = express.Router();

quizRouter.use(authMiddleware);
quizRouter.post("/", quizController.addQuiz.bind(quizController));

export default quizRouter;