import { Schema, model } from "mongoose";

const answerSchema = new Schema({
    text: {
        type: String,
        required: [ true, "Answer text is required" ]
    },
    isCorrect: {
        type: Boolean,
        default: false
    }
});

const questionSchema = new Schema({
    text: {
        type: String,
        required: [ true, "Question text is required" ]
    },
    image: String,
    type: {
        type: String,
        enum: [ "single", "multiple", "input" ],
        default: "single"
    },
    options: [answerSchema], // answers for single/multiple questions
    inputAnswer: String, // correct answer for input questions
    points: {
        type: Number,
        default: 1
    }
});

export const Question = model("Question", questionSchema);