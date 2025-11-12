import { Request, Response } from "express";
import { IssueModel } from "../models/Issue";
import { CounterModel } from "../models/Counter";
import { insertIssueSchema, updateIssueStatusSchema } from "../../shared/schema";

// ✅ Create new issue with auto-increment issueNumber
export const createIssue = async (req: Request, res: Response) => {
  try {
    const parsed = insertIssueSchema.parse(req.body);
    if (!parsed.adminRemarks) parsed.adminRemarks = "";

    // Auto-increment issueNumber
    const counter = await CounterModel.findByIdAndUpdate(
      "issueNumber",
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const issue = new IssueModel({
      ...parsed,
      issueNumber: counter!.seq,
    });

    await issue.save();
    res.status(201).json(issue);
  } catch (error: any) {
    console.error("Create issue error:", error);
    res.status(400).json({ error: error.message });
  }
};

// Get all issues
export const getIssues = async (_req: Request, res: Response) => {
  try {
    const issues = await IssueModel.find().sort({ createdAt: -1 });
    res.json(issues);
  } catch (error: any) {
    console.error("Get issues error:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get issue by ID
export const getIssueById = async (req: Request, res: Response) => {
  try {
    const issue = await IssueModel.findById(req.params.id);
    if (!issue) return res.status(404).json({ error: "Issue not found" });
    res.json(issue);
  } catch (error: any) {
    console.error("Get issue by ID error:", error);
    res.status(400).json({ error: error.message });
  }
};

// Update issue
export const updateIssue = async (req: Request, res: Response) => {
  try {
    const updateData = { ...req.body };
    if (updateData.adminRemarks == null) updateData.adminRemarks = "";

    const updatedIssue = await IssueModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    if (!updatedIssue) return res.status(404).json({ error: "Issue not found" });
    res.json(updatedIssue);
  } catch (error: any) {
    console.error("Update issue error:", error);
    res.status(400).json({ error: error.message });
  }
};

// Delete issue
export const deleteIssue = async (req: Request, res: Response) => {
  try {
    const deleted = await IssueModel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Issue not found" });
    res.json({ message: "Issue deleted successfully" });
  } catch (error: any) {
    console.error("Delete issue error:", error);
    res.status(400).json({ error: error.message });
  }
};

// Update only status
export const updateIssueStatus = async (req: Request, res: Response) => {
  try {
    const parsed = updateIssueStatusSchema.parse(req.body);
    if (parsed.adminRemarks == null) parsed.adminRemarks = "";

    const updatedIssue = await IssueModel.findByIdAndUpdate(
      req.params.id,
      { status: parsed.status, adminRemarks: parsed.adminRemarks },
      { new: true, runValidators: true }
    );
    if (!updatedIssue) return res.status(404).json({ error: "Issue not found" });
    res.json({ issue: updatedIssue });
  } catch (error: any) {
    console.error("Update issue status error:", error);
    res.status(400).json({ error: error.message });
  }
};
