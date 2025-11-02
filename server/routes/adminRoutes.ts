import express from "express";
import Announcement from "../models/Announcement.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// CREATE
router.post("/announcements", protect, adminOnly, async (req, res) => {
  try {
    const { title, content } = req.body;
    const announcement = await Announcement.create({
      title,
      content,
      postedBy: req.user!._id,
      date: new Date()
    });
    res.status(201).json(announcement);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Unable to create announcement" });
  }
});

// UPDATE
router.put("/announcements/:id", protect, adminOnly, async (req, res) => {
  try {
    const updated = await Announcement.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title, content: req.body.content },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating announcement" });
  }
});

// DELETE
router.delete("/announcements/:id", protect, adminOnly, async (req, res) => {
  try {
    const deleted = await Announcement.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Announcement deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting announcement" });
  }
});

export default router;
