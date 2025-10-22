import { timeStamp } from "console";
import mongoose from "mongoose";

const userScheme = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"]
        },
        username: {
            type: String,
            required: [true, "Username is required"]
        },
        email: {
            type: String,
            required: [true, "Email is required"]
        },
        password: {
            type: String,
            require: [true, "Password is required"]
        }
    },
    {
        timestamps: true
    }
);

export const User = mongoose.model("User", userScheme);