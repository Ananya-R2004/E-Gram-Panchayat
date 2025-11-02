import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// test route (optional)
router.get("/test", (_req, res) => res.send("Auth API is working ✅"));

export default router;
