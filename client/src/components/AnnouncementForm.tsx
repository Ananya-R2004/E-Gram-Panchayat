// client/src/components/AnnouncementForm.tsx
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Announcement, InsertAnnouncement } from "@shared/schema";

interface AnnouncementFormProps {
  announcement?: Announcement;
  onSubmit: (data: InsertAnnouncement) => void;
  onCancel: () => void;
}

export default function AnnouncementForm({
  announcement,
  onSubmit,
  onCancel,
}: AnnouncementFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (announcement) {
      setTitle(announcement.title || "");
      setDescription(announcement.description || "");
      // note: we don't set imageFile from announcement.image (string) — file input can't be prefilled
    } else {
      setTitle("");
      setDescription("");
      setImageFile(null);
    }
  }, [announcement]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Build InsertAnnouncement object — server expects { title, description, image? }
    // For now, we send the image filename (if any). If you want file upload, switch to multipart/form-data and handle on server.
    const payload: InsertAnnouncement = {
      title: title.trim(),
      description: description.trim(),
      ...(imageFile ? { image: imageFile.name } : {}),
    };

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter announcement title"
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        {/* Using Input for simplicity — replace with a textarea if you want multiline styling */}
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter announcement details"
          required
          className="w-full rounded-md border px-3 py-2 text-sm" // small styling if using plain textarea
          rows={5}
        />
      </div>

      <div>
        <Label htmlFor="image">Image (optional)</Label>
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          className="mt-2"
        />
        {imageFile && <p className="text-sm mt-1">Selected: {imageFile.name}</p>}
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{announcement ? "Update" : "Create"}</Button>
      </div>
    </form>
  );
}
