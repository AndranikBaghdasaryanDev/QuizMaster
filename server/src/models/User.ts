import { Schema, model } from "mongoose";

const userScheme = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"]
        },
        username: {
            type: String,
            unique: [true, "Username is busy"],
            sparse: true
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: [true, "Email is busy"]
        },
        password: {
            type: String
        },
        googleId: {
            type: String,
            default: null,
        },
        avatar: String,
        authProvider: {
            type: String,
            enum: ["local", "google"],
            default: "local",
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
        isPrivate: Boolean,
        subscription: {
            plan: {
                type: String,
                enum: [ "free", "pro", "premium" ],
                default: "free"
            },
            expires: Date
        }
    },
    {
        timestamps: true
    }
);

export const User = model("User", userScheme);