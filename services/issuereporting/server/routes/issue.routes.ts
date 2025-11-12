import { Router } from "express";
import {
  createIssue,
  getIssues,
  getIssueById,
  updateIssue,
  deleteIssue,
  updateIssueStatus,
} from "../controllers/issue.controller";

const router = Router();

// CRUD endpoints
router.get("/", getIssues);
router.get("/:id", getIssueById);
router.post("/", createIssue); // ✅ now villagers’ POST route uses auto-increment
router.put("/:id", updateIssue);
router.delete("/:id", deleteIssue);
router.patch("/:id/status", updateIssueStatus);

export default router;
