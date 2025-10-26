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
    ]
});

export const Quiz = model("Quiz", quizSchema);