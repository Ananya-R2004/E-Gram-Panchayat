import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { log } from "./utils/log.js";
import authRoutes from "./routes/authRoutes.js";
import villageRoutes from "./routes/villageRoutes.js";
import announcementRoutes from "./routes/announcementRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  })
);

app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/villages", villageRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (_req, res) => res.send("🌐 E-Gram Panchayat API is running..."));

app.listen(PORT, () => log(`🚀 Server running on port ${PORT}`));
