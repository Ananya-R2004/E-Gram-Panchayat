import { IssueModel } from "./models/Issue";
import { InsertIssue, UpdateIssueStatus } from "../shared/schema";

// ✅ Ensure schema applies toJSON consistently
IssueModel.schema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret: Record<string, any>) => {
    if (ret._id) {
      ret.id = ret._id.toString();
      delete ret._id;
    }
  },
});

// Get all issues (latest first)
export async function getAllIssues() {
  return await IssueModel.find().sort({ createdAt: -1 });
}

// Get one issue
export async function getIssueById(id: string) {
  return await IssueModel.findById(id);
}

// Create a new issue
export async function createIssue(data: InsertIssue) {
  const issue = new IssueModel(data);
  await issue.save();
  return issue;
}

// Update issue status
export async function updateIssueStatus(id: string, update: UpdateIssueStatus) {
  return await IssueModel.findByIdAndUpdate(
    id,
    { status: update.status, adminRemarks: update.adminRemarks },
    { new: true }
  );
}
