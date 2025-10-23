import mongoose from "mongoose";
import { env } from "./env.ts";

export const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGO_URI, {
      // optional options for older versions
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // exit on failure
  }
};

export const disconnectDb = async () => {
    return mongoose.disconnect().then(() => console.log("disconnected!"))
}
