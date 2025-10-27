import { Schema, model } from "mongoose";

const quizSchema = new Schema({
    title: {
        type: String,
        required: [ true, "Title is required" ]
    },
    description: {
        type: String,
        required: [ true, "Description is required" ]
    },
    owner_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    questions: [
        {
            type: Schema.Types.ObjectId,
            ref: "Question"
        }
    ],
    image: String,
    access: {
        type: String,
        enum: [ "free", "pro", "premium" ],
        default: "free"
    },
    isActive: {
        type: Boolean,
        default: true
    },
    availableFrom: Date,
    availableUntil: Date
});

export const Quiz = model("Quiz", quizSchema);