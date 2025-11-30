import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import issueRoutes from "./routes/issue.routes";
import { adminAuthRouter } from "./routes/AdminAuth";

dotenv.config();

const app = express();

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5178", // UPDATED CLIENT PORT
    credentials: true
  })
);
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/issuereporting")
  .then(() => console.log("[mongo] ✅ Connected to MongoDB"))
  .catch((err) => console.error("[mongo] ❌ Connection failed:", err));

// API routes
app.use("/api/issues", issueRoutes);
app.use("/api/admin", adminAuthRouter);

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () =>
  console.log(`[express] 🚀 Server running at http://localhost:${PORT}`)
);
