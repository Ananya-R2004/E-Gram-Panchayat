import mongoose, { Schema, Document } from "mongoose";

export interface IAnnouncement extends Document {
  title: string;
  description: string;
  date: Date;
  image?: string; // ✅ Add this optional field
}

const AnnouncementSchema: Schema = new Schema<IAnnouncement>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now },
    image: { type: String, required: false }, // ✅ Add this in schema too
  },
  { timestamps: true }
);

export default mongoose.model<IAnnouncement>("Announcement", AnnouncementSchema);
