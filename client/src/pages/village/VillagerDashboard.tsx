import { useEffect, useState } from "react";
import { API_URL } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function VillagerDashboard() {
  const [announcements, setAnnouncements] = useState([]);
  const [villages, setVillages] = useState([]);

  useEffect(() => {
    (async () => {
      const annRes = await fetch(`${API_URL}/api/announcements`);
      const annData = await annRes.json();
      setAnnouncements(annData);

      const vilRes = await fetch(`${API_URL}/api/villages`);
      const vilData = await vilRes.json();
      setVillages(vilData);
    })();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold mb-4">Villager Dashboard</h1>

      {/* Announcements */}
      <section>
        <h2 className="text-2xl font-semibold mb-3">Latest Announcements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {announcements.map((a: any) => (
            <Card key={a._id}>
              <CardHeader>
                <CardTitle>{a.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{a.description}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Posted by {a.postedBy} on {new Date(a.date).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Village Info */}
      <section>
        <h2 className="text-2xl font-semibold mb-3">Village Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {villages.map((v: any) => (
            <Card key={v._id}>
              <CardHeader>
                <CardTitle>{v.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p><strong>Population:</strong> {v.population}</p>
                <p>{v.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
