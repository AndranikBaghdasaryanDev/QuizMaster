import type { Request, Response } from "express";
import type { IQuestion } from "@/quiz.ts";
import { Quiz, Question, Category } from "../models/index.ts";
import validator from "../lib/validator.ts";
import type { Types } from "mongoose";
import type { IResponse } from "@/response.ts";
import path from "path";

class QuizController {
    async addQuiz(req: Request, res: Response) {
        if (!req.body) {
            return res.status(400).send({ error: true, message: "Payload is required" });
        }
    
        try {
            // 1️⃣ Parse quizData JSON
            const quizData = req.body.quizData ? JSON.parse(req.body.quizData) : {};
            const { 
                title, 
                description, 
                questions, 
                isActive = true, 
                access = "free", 
                category,
                level,
                availableFrom, 
                availableUntil 
            } = quizData;
    
            // 2️⃣ Validate fields
            if (!title || !validator.isValidLen(title.trim(), 3, 500)) {
                return res.status(400).send({ error: true, message: "Title must be 3-500 characters long." });
            }
            if (!description || !validator.isValidLen(description.trim(), 10, 1000)) {
                return res.status(400).send({ error: true, message: "Description must be 10-1000 characters long." });
            }
            if (!questions || questions.length === 0) {
                return res.status(400).send({ error: true, message: "At least 1 question should be added" });
            }
    
            const categoryIsValid = await Category.findById(category);
            if (!categoryIsValid) {
                return res.status(404).send({ error: true, message: "Invalid category ID" });
            }

            if (!level || !(["easy", "medium", "hard"].includes(level))) {
                return res.status(400).send({ error: true, message: "Invalid level" });
            }
            // 3️⃣ Attach quiz image
            const quizImageUrl = req.files?.quizImage?.[0]
                ? `/uploads/quiz/${req.files.quizImage[0].filename}`
                : null;
    
            // 4️⃣ Attach question images
            const questionImagesUrl = req.files?.questionImages
                ? (req.files.questionImages as Express.Multer.File[]).map(f => `/uploads/question/${f.filename}`)
                : [];
    
            const questionsWithImages = questions.map((q: IQuestion, idx: number) => ({
                ...q,
                image: questionImagesUrl[idx] ?? null
            }));
    
            // 5️⃣ Validate and insert questions
            const addQuestionsRes = await this.#addQuestions(questionsWithImages);
            if (addQuestionsRes.error) {
                return res.status(400).send(addQuestionsRes);
            }
    
            // 6️⃣ Create quiz
            const quiz = await Quiz.create({
                title,
                description,
                owner_id: req.user?._id,
                access,
                questions: addQuestionsRes.payload,
                isActive,
                category,
                availableFrom: availableFrom ? new Date(availableFrom) : null,
                availableUntil: availableUntil ? new Date(availableUntil) : null,
                image: quizImageUrl
            });
    
            return res.status(201).send({ error: false, message: "Quiz added successfully", payload: quiz._id });
        } catch(err) {
            console.error(err);
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
    async getQuizzes(req: Request, res: Response) {
        const { owner_id, access, limit, offset } = req.body ?? {};
        const filter:any = {};
        if (owner_id) {
            filter.owner_id = owner_id;
            if (!(owner_id == req.user?._id)) {
                
            }
        }
    }
    async getQuiz(req: Request, res: Response) {

    }
}

export default new QuizController();