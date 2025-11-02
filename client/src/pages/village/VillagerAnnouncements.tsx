// src/pages/VillagerAnnouncements.tsx
import { useEffect, useState } from "react";
import { Announcement } from "@shared/schema";
import AnnouncementCard from "@/components/AnnouncementCard";

export default function VillagerAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/announcements");
        const data = await res.json();
        setAnnouncements(data);
      } catch (err) {
        console.error("Error fetching announcements:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  if (loading) return <p className="text-center text-gray-500 mt-10">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        📢 Village Announcements
      </h1>
      {announcements.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {announcements.map((a) => (
            <AnnouncementCard key={a._id} announcement={a} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No announcements yet.</p>
      )}
    </div>
  );
}
