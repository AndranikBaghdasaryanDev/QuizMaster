import express from "express";
import quizController from "../controllers/quiz.ts";
import { authMiddleware } from "../middlewares/auth.ts";
import { upload } from "../lib/uploadImage.ts";

const quizRouter = express.Router();

quizRouter.use(authMiddleware);

quizRouter.post(
    "/", 
    upload([
        { name: "quizImage", folder: "quiz", maxCount: 1 },
        { name: "questionImages", folder: "question", maxCount: 20 }
    ]),
    quizController.addQuiz.bind(quizController)
);
quizRouter.get("/", quizController.getQuizzes);
quizRouter.get("/:id", quizController.getQuizById);
quizRouter.post("/submit", quizController.submitQuiz);

export default quizRouter;