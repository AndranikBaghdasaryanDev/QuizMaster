import { Schema, model } from "mongoose";

const attemptSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    quiz_id: {
        type: Schema.Types.ObjectId,
        ref: "Quiz",
        required: true
    },
    answers: [
        {
            questionId: {
                type: String,
                required: true
            },
            answer: {
                type: Schema.Types.Mixed, // Can be string or array of strings
                required: true
            }
        }
    ],
    score: {
        totalScore: {
            type: Number,
            required: true
        },
        maxScore: {
            type: Number,
            required: true
        },
        percentage: {
            type: Number,
            required: true
        },
        correctAnswers: {
            type: Number,
            required: true
        },
        totalQuestions: {
            type: Number,
            required: true
        }
    }
}, {
    timestamps: true
});

// Index for faster queries
attemptSchema.index({ user_id: 1, quiz_id: 1 });
attemptSchema.index({ quiz_id: 1 });

export const Attempt = model("Attempt", attemptSchema);

