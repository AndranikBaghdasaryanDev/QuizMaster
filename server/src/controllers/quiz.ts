import type { Request, Response } from "express";
import type { IQuestion, IQuiz, IQuizUploadFiles, IScoreResult, IUserAnswer } from "@/quiz.ts";
import { Quiz, Question, Category, User } from "../models/index.ts";
import validator from "../lib/validator.ts";
import mongoose, { type Types } from "mongoose";
import type { IResponse } from "@/response.ts";

class QuizController {
    async addQuiz(req: Request, res: Response) {
        if (!req.body) {
            return res.status(400).send({ error: true, message: "Payload is required" });
        }

        try {
            // 1️⃣ Parse quizData JSON
            const quizData = req.body.quizData ? req.body.quizData : {};
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
            console.log(quizData)
            // 2️⃣ Validate fields
            if (!title || !validator.isValidLen(title.trim(), 3, 500)) {
                console.log("test", title)
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

            const files = req.files as unknown as IQuizUploadFiles;

            // console.log(files?.quizImage, "files");
            // // 3️⃣ Attach quiz image
            const quizImageUrl = files?.quizImage?.[0] != undefined
                ? `/uploads/quiz/${files.quizImage[0].filename}`
                : null;
            // // 4️⃣ Attach question images
            const questionImagesUrl = files?.questionImages
                ? (files.questionImages as Express.Multer.File[]).map(f => `/uploads/question/${f.filename}`)
                : [];


            const questionsWithImages = questions.map((q: IQuestion, idx: number) => {
                const { _id, ...rest } = q;
                return {
                    ...rest,
                    image: questionImagesUrl[idx] ?? null
                }
            });

            console.log(questionsWithImages)
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
                level,
                category,
                availableFrom: availableFrom ? new Date(availableFrom) : null,
                availableUntil: availableUntil ? new Date(availableUntil) : null,
                image: quizImageUrl
            });
            console.log(quiz)
            return res.status(201).send({ error: false, message: "Quiz added successfully", payload: quiz._id });
        } catch (err) {
            console.error(err);
            return res.status(500).send({ error: true, message: "Server error", payload: err });
        }
    }

    async #addQuestions(questions: IQuestion[]): Promise<IResponse<Types.ObjectId[] | string>> {
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
        try {
            console.log("started")
            const { owner_id, access, level, category, limit, offset } = req.body ?? {};

            const filter: any = {};
            const options: any = {};

            if (owner_id) {
                filter.owner_id = owner_id;
                if (!(owner_id == req.user?._id)) {
                    console.log("owner id ")
                    const ownerDoc = await User.findById(owner_id)
                        .select("-password -verifyToken -verifyExpires");

                    if (!ownerDoc) {
                        return res.status(404).send({ error: true, message: "Owner not found" });
                    }

                    filter.isActive = true;
                    const now = new Date();
                    filter.availableFrom = { $lte: now };
                    filter.$or = [
                        { availableUntil: { $gte: now } },
                        { availableUntil: { $exists: false } }
                    ];
                }
            }
            if (category) {
                console.log("on category 1")
                if (!mongoose.Types.ObjectId.isValid(category)) {
                    return res.status(400).send({ error: true, message: "Invalid category ID format" });
                }
                const isValidCategory = await Category.findById(category);
                if (!isValidCategory) {
                    return res.status(400).send({ error: true, message: "Invalid category ID" });
                }
                filter.category = category;
            }
            if (access) {
                console.log("on acces 1")

                const ACCESS_LEVELS = ["free", "pro", "premium"];
                const levelIndex = ACCESS_LEVELS.indexOf(access);

                if (levelIndex === -1) {
                    return res.status(400).send({ error: true, message: "Invalid access level" });
                }
                const allowedAcccess = ACCESS_LEVELS.slice(0, levelIndex + 1);
                filter.access = { $in: allowedAcccess };
            }
            if (level) {
                console.log("on level 1")

                if (["easy", "medium", "hard"].indexOf(level) === -1) {
                    return res.status(400).send({ error: true, message: "Invalid level" });
                }
                filter.level = level;
            }

            if (offset) { options.offset = Math.abs(Number(offset)); }
            if (limit) { options.limit = Math.abs(Number(limit)); }

            if (Object.keys(filter).length === 0) {
                filter.isActive = true;
            }

            const quizzes = await Quiz.find(filter, null, options).populate("category");
            return res.send({ error: false, message: "Success", payload: quizzes });
        } catch (err) {
            return res.status(500).send({ error: true, message: "Server error", payload: err });
        }
    }
    async getQuizById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id || !mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).send({ error: true, message: "Invalid/missing Quiz ID" });
            }

            const quiz = await Quiz.findById(id)
                .populate("category")
                .populate("questions");
            if (!quiz) {
                return res.status(404).send({ error: true, message: "Quiz not found or unavailable." });
            }

            const userId = req.user?._id;
            const isOwner = quiz.owner_id.toString() === userId?.toString();

            if (!isOwner) {
                const now = new Date();
                if (!quiz.isActive || quiz.availableFrom > now ||
                    quiz.availableUntil && quiz.availableUntil < now) {
                    return res.status(400).send({ error: true, message: "Inactive or unavailable quiz" });
                }
            }

            return res.send({ error: false, message: "Success", payload: quiz });

        } catch (err) {
            return res.status(500).send({ error: true, message: "Server error", payload: err });
        }
    }

    async submitQuiz(req: Request, res: Response) {
        try {
            if (!req.body) {
                return res.status(400).send({ error: true, message: "Payload is required" });
            }

            const { quizId, answers } = req.body;
            console.log(quizId)
            if (!quizId || !mongoose.Types.ObjectId.isValid(quizId)) {
                return res.status(400).send({ error: true, message: "Invalid/missing Quiz ID" });
            }
            if (!answers || !Array.isArray(answers)) {
                return res.status(400).send({ error: true, message: "Invalid/missing Answers" });
            }

            const quiz = await Quiz.findById(quizId).populate("questions");
            if (!quiz) {
                return res.status(404).send({ error: true, message: "Quiz not found or unavailable." });
            }

            if (!quiz.questions || quiz.questions.length === 0) {
                return res.status(404).send({ error: true, message: "Questions not found" });
            }

            const userAnswers: IUserAnswer[] = answers.map((answer: any) => ({
                questionId: answer.questionId?.toString() || "",
                answer: answer.answer
            }));

            // Convert mongoose documents to IQuestion format
            const questions: IQuestion[] = (quiz.questions as any[]).map((q: any) => ({
                _id: q._id.toString(),
                text: q.text,
                type: q.type,
                image: q.image || null,
                options: q.options || null,
                inputAnswer: q.inputAnswer || null,
                points: Math.abs(q.points) || 1
            }));
            console.log(questions,userAnswers)
            const scoreResult = await this.#calculateScore(questions, userAnswers);
            return res.send({
                error: false,
                message: "Success",
                payload: {
                    totalScore: scoreResult.totalScore,
                    maxScore: scoreResult.maxScore,
                    percentage: scoreResult.percentage,
                    correctAnswers: scoreResult.correctAnswers,
                    totalQuestions: scoreResult.totalQuestions
                }
            });
        } catch (err) {
            console.error(err);
            return res.status(500).send({ error: true, message: "Server error", payload: err });
        }
    }

    async #calculateScore(questions: IQuestion[], userAnswers: IUserAnswer[]): Promise<IScoreResult> {
        let totalScore = 0;
        let maxScore = 0;
        let correctAnswers = 0;

        for (const question of questions) {
            maxScore += question.points;
            const userAnswer = userAnswers.find(a => a.questionId === question._id);

            if (!userAnswer) {
                continue; // No answer provided, skip
            }

            let isCorrect = false;

            switch (question.type) {
                case "single": {
                    // For single choice, user answer should be a string matching one of the correct option texts
                    if (typeof userAnswer.answer === "string" && question.options) {
                        const correctOption = question.options.find(opt => opt.isCorrect);
                        if (correctOption && userAnswer.answer.trim().toLowerCase() === correctOption.text.trim().toLowerCase()) {
                            isCorrect = true;
                        }
                    }
                    break;
                }
                case "multiple": {
                    // For multiple choice, user answer should be an array of strings
                    // All correct options must be selected, and no incorrect options
                    if (Array.isArray(userAnswer.answer) && question.options) {
                        const correctOptions = question.options.filter(opt => opt.isCorrect);
                        const userAnswersArray = (userAnswer.answer as string[]).map(a => a.trim().toLowerCase());
                        const correctAnswersArray = correctOptions.map(opt => opt.text.trim().toLowerCase());

                        // Check if all correct answers are selected and no incorrect ones
                        const allCorrectSelected = correctAnswersArray.every(correct =>
                            userAnswersArray.includes(correct)
                        );
                        const hasIncorrectSelected = userAnswersArray.some(userAns =>
                            !correctAnswersArray.includes(userAns)
                        );

                        isCorrect = allCorrectSelected && !hasIncorrectSelected;
                    }
                    break;
                }
                case "input": {
                    // For input type, compare user answer with inputAnswer (case-insensitive, trimmed)
                    if (typeof userAnswer.answer === "string" && question.inputAnswer) {
                        const userInput = userAnswer.answer.trim().toLowerCase();
                        const correctInput = question.inputAnswer.trim().toLowerCase();
                        isCorrect = userInput === correctInput;
                    }
                    break;
                }
            }

            if (isCorrect) {
                totalScore += question.points;
                correctAnswers++;
            }
        }

        const percentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

        return {
            totalScore,
            maxScore,
            percentage,
            correctAnswers,
            totalQuestions: questions.length
        };
    }
}

export default new QuizController();