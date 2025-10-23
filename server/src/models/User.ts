import mongoose from "mongoose";

const userScheme = new mongoose.Schema(
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
        verifyExpires: Date
    },
    {
        timestamps: true
    }
);

export const User = mongoose.model("User", userScheme);