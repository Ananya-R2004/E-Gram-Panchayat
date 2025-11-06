import { Request, Response } from "express";
import Announcement, { IAnnouncement } from "../models/Announcement.js";

// Simple request type that safely supports file (any type)
interface SafeRequest extends Request {
  file?: any;
}

// Create a new announcement
export const createAnnouncement = async (req: SafeRequest, res: Response) => {
  try {
    const { title, description } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;

    const newAnnouncement = new Announcement({
      title,
      description,
      image,
    });

    await newAnnouncement.save();
    res.status(201).json(newAnnouncement);
  } catch (error) {
    console.error("Error creating announcement:", error);
    res.status(500).json({ message: "Error creating announcement", error });
  }
};

// Get all announcements
export const getAnnouncements = async (_req: Request, res: Response) => {
  try {
    const announcements = await Announcement.find().sort({ date: -1 });
    res.status(200).json(announcements);
  } catch (error) {
    console.error("Error fetching announcements:", error);
    res.status(500).json({ message: "Error fetching announcements", error });
  }
};

// Update announcement
export const updateAnnouncement = async (req: SafeRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updatedData: Partial<IAnnouncement> = { title, description };
    if (image) updatedData.image = image;

    const announcement = await Announcement.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    res.status(200).json(announcement);
  } catch (error) {
    console.error("Error updating announcement:", error);
    res.status(500).json({ message: "Error updating announcement", error });
  }
};

// Delete announcement
export const deleteAnnouncement = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const announcement = await Announcement.findByIdAndDelete(id);

    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    res.status(200).json({ message: "Announcement deleted successfully" });
  } catch (error) {
    console.error("Error deleting announcement:", error);
    res.status(500).json({ message: "Error deleting announcement", error });
  }
};
