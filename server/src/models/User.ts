import { Schema, model } from "mongoose";

const userScheme = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"]
        },
        username: {
            type: String,
            required: [true, "Username is required"],
            unique: [true, "Username is busy"]
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: [true, "Email is busy"]
        },
        password: {
            type: String,
            required: [true, "Password is required"]
        },
        isVerified: {
            type: Boolean,
            required: true,
            default: false
        },
        verifyToken: String,
        verifyExpires: Date,
        resetToken: String,
        resetExpires: Date,
        bio: String,
        subscription: {
            plan: {
                type: String,
                enum: [ "free", "pro", "premium" ],
                default: "free"
            },
            expires: Date
        },
        quizzesCreated: [{ type: Schema.Types.ObjectId, ref: "Quiz" }],
        quizzesTaken: [
            {
                type: Schema.Types.ObjectId, ref: "Quiz",
                score: Number,
                completedAt: Date
            }
        ]
    },
    {
        timestamps: true
    }
);

export const User = model("User", userScheme);