import { z } from "zod";

export const issueCategories = [
  "electricity",
  "street_lights",
  "water_supply",
  "roads",
  "sanitation",
  "drainage",
  "public_property",
  "other",
] as const;

export const issueStatuses = [
  "pending",
  "in_progress",
  "resolved",
  "rejected",
] as const;

export type IssueCategory = (typeof issueCategories)[number];
export type IssueStatus = (typeof issueStatuses)[number];

export const insertIssueSchema = z.object({
  category: z.enum(issueCategories),
  status: z.enum(issueStatuses).default("pending"),
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  location: z.string().min(3, "Location must be at least 3 characters"),
  submittedBy: z.string().min(2, "Name must be at least 2 characters"),
  contactNumber: z.string().min(10, "Contact number is required"),
  adminRemarks: z.string().nullable().optional(),
});

export const updateIssueStatusSchema = z.object({
  status: z.enum(issueStatuses),
  adminRemarks: z.string().nullable().optional(),
});

export type InsertIssue = z.infer<typeof insertIssueSchema>;
export type UpdateIssueStatus = z.infer<typeof updateIssueStatusSchema>;

export type Issue = {
  id: string;
  issueNumber?: number;
  category: IssueCategory;
  status: IssueStatus;
  title: string;
  description: string;
  location: string;
  submittedBy: string;
  contactNumber: string;
  adminRemarks?: string | null;
  createdAt: string;
  updatedAt: string;
};
