import express from "express";
import {
  getAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from "../controllers/announcementController.js"; // adjust path if needed
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public: anyone can fetch announcements
router.get("/", getAnnouncements);

// Admin only: create, update, delete
router.post("/", protect, adminOnly, createAnnouncement);
router.put("/:id", protect, adminOnly, updateAnnouncement);
router.delete("/:id", protect, adminOnly, deleteAnnouncement);

export default router;
