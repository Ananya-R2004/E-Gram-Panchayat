import { Router, Request, Response } from "express";
import { IssueModel } from "../models/Issue";
import { CounterModel } from "../models/Counter";
import { insertIssueSchema } from "../../shared/schema";

const adminAuthRouter = Router();

// Verify admin secret
adminAuthRouter.post("/verify", (req: Request, res: Response) => {
  const { code } = req.body;
  const adminSecret = process.env.ADMIN_SECRET;

  if (!code) return res.status(400).json({ error: "Code is required" });

  if (code === adminSecret) return res.json({ success: true });

  return res.status(401).json({ success: false, error: "Invalid code" });
});

// ✅ Create new issue
adminAuthRouter.post("/create-issue", async (req: Request, res: Response) => {
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
});

export { adminAuthRouter };
