import mongoose from "mongoose";
import { env } from "./env.ts";

export const connectDB = async () => {
  try {
    // 1️⃣ Listen to connection state events (for debugging & reconnect tracking)
    mongoose.connection.on("connected", () => {
      console.log("✅ MongoDB connected successfully");
    });
    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err);
    });
    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️ MongoDB disconnected");
    });
    mongoose.connection.on("reconnected", () => {
      console.log("🔁 MongoDB reconnected");
    });

    // 2️⃣ Actually connect
    await mongoose.connect(env.MONGO_URI, {
      // optional options for backwards compatibility
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      autoIndex: true, // ensures indexes are built
      serverSelectionTimeoutMS: 10000, // fail fast if server isn't reachable
      maxPoolSize: 10, // controls number of concurrent connections
    });

    // 3️⃣ Verify connection state explicitly
    if (mongoose.connection.readyState !== 1) {
      throw new Error("MongoDB connection state invalid: " + mongoose.connection.readyState);
    }

  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  }
};

// 4️⃣ Graceful shutdown handler
export const disconnectDb = async () => {
  try {
    await mongoose.disconnect();
    console.log("🛑 MongoDB disconnected!");
  } catch (err) {
    console.error("Error disconnecting MongoDB:", err);
  }
};

