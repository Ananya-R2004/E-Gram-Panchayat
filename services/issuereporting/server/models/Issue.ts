import mongoose, { Schema, Document } from "mongoose";
import { IssueStatus } from "../../shared/schema";

export interface IIssue extends Document {
  id?: string;
  issueNumber?: number; // ✅ new unique issue number
  category: string;
  title: string;
  description?: string;
  location?: string;
  status: IssueStatus;
  submittedBy: string;
  contactNumber: string;
  adminRemarks?: string;
  createdAt: Date;
  updatedAt: Date;
}

const IssueSchema = new Schema<IIssue>(
  {
    issueNumber: { type: Number, unique: true, index: true }, // ✅ auto-increment
    category: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, default: "" },
    location: { type: String, default: "" },
    status: {
      type: String,
      enum: ["pending", "in_progress", "resolved", "rejected"],
      default: "pending",
    },
    submittedBy: { type: String, required: true },
    contactNumber: { type: String, required: true },
    adminRemarks: { type: String, default: "" },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (_doc, ret: any) => {
        if (ret._id) {
          ret.id = ret._id.toString();
          delete ret._id;
        }
        delete ret.__v;
        return ret;
      },
    },
    toObject: { virtuals: true },
  }
);

IssueSchema.virtual("id").get(function (this: any) {
  return this._id?.toString();
});

export const IssueModel =
  mongoose.models.Issue || mongoose.model<IIssue>("Issue", IssueSchema);
