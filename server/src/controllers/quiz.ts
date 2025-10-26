import type { Request, Response } from "express";
import type { IQuestion } from "@/quiz.ts";
import { Quiz, Question } from "../models/index.ts";
import validator from "../lib/validator.ts";
import type { Types } from "mongoose";
import type { IResponse } from "@/response.ts";

class QuizController {
    async addQuiz(req: Request, res: Response) {
        if (!req.body) {
            return res.status(400).send({ error: true, message: "Payload is required" });
        }
        try {

            const { 
                title, 
                description, 
                questions, 
                isActive = true, 
                access = "free", 
                availableFrom, 
                availableUntil 
            } = req.body;
            
            if (!title || !validator.isValidLen(title.trim(), 3, 500)) {
                return res.status(400).send({ error: true, message: "Title must be 3-500 character long." });
            }
            if (!description || !validator.isValidLen(description.trim(), 10, 1000)) {
                return res.status(400).send({ error: true, message: "Description must be 10-1000 character long." });
            }
            if (!questions || questions.length <= 0) {
                return res.status(400).send({ error: true, message: "At least 1 question should be added" });
            }
            
            const addQuestionsRes = await this.#addQuestions(questions);
            if (addQuestionsRes.error) {
                return res.status(400).send(addQuestionsRes);
            }

            const quiz = await Quiz.create({
                title,
                description,
                owner_id: req.user?._id,
                access,
                questions: addQuestionsRes.payload,
                isActive,
                availableFrom: availableFrom ? new Date(availableFrom) : null,
                availableUntil: availableUntil ? new Date(availableUntil) : null
            })
            return res.status(201).send({ error: false, message: "Quiz added successfully", payload: quiz._id });
        } catch(err) {
            return res.status(500).send({ error: true, message: "Server error", payload: err });
        }
    }
    async #addQuestions(questions: IQuestion[]):Promise<IResponse<Types.ObjectId[] | string>> {
        for (const question of questions) {
            const res = validator.isValidQuestion(question);
            if (res.error) {
                return { error: true, message: res.message };
            }
        }
        const questionsCreated = await Question.insertMany(questions);
        return { error: false, message: "ok", payload: questionsCreated.map(q => q._id) };
    }
}

export default new QuizController();