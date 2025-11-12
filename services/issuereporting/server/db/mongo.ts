import mongoose from "mongoose";
import dotenv from "dotenv";
import { log } from "../vite";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("❌ MONGO_URI environment variable is required");
}

export async function connectMongo() {
  try {
    await mongoose.connect(MONGO_URI!); // now MONGO_URI is guaranteed string
    log("✅ Connected to MongoDB", "mongo");
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err);
    throw err;
  }
}

export async function disconnectMongo() {
  await mongoose.disconnect();
  log("🔌 Disconnected from MongoDB", "mongo");
}
