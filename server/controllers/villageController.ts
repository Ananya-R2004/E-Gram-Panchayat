import { Request, Response } from "express";
import Village from "../models/Village.js";

// Get all villages
export const getVillages = async (_req: Request, res: Response) => {
  try {
    const villages = await Village.find();
    res.json(villages);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch villages" });
  }
};

// Add new village
export const addVillage = async (req: Request, res: Response) => {
  try {
    const village = new Village(req.body);
    const savedVillage = await village.save();
    res.status(201).json(savedVillage);
  } catch (error) {
    res.status(400).json({ message: "Failed to add village" });
  }
};

// Update village
export const updateVillage = async (req: Request, res: Response) => {
  try {
    const updated = await Village.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Village not found" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: "Failed to update village" });
  }
};

// Delete village
export const deleteVillage = async (req: Request, res: Response) => {
  try {
    const deleted = await Village.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Village not found" });
    res.json({ message: "Village deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Failed to delete village" });
  }
};
