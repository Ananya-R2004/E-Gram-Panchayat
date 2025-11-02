// src/components/AnnouncementCard.tsx
import { Announcement } from "@shared/schema";

interface Props {
  announcement: Announcement;
}

export default function AnnouncementCard({ announcement }: Props) {
  return (
    <div className="bg-white shadow-md rounded-xl p-5 border border-gray-100 hover:shadow-lg transition">
      {announcement.image && (
        <img
          src={announcement.image}
          alt={announcement.title}
          className="w-full h-40 object-cover rounded-md mb-4"
        />
      )}
      <h2 className="text-lg font-semibold text-gray-800 mb-2">{announcement.title}</h2>
      <p className="text-gray-600 text-sm mb-3">{announcement.description}</p>
      <p className="text-xs text-gray-400">
        Posted by: {announcement.postedBy || "Admin"}
      </p>
      <p className="text-xs text-gray-400">
        {announcement.date ? new Date(announcement.date).toLocaleDateString() : ""}
      </p>
    </div>
  );
}
