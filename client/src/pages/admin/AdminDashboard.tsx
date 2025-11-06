import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Megaphone, TrendingUp } from "lucide-react";
import { API_URL } from "@/lib/api";
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalVillages: 0,
    totalAnnouncements: 0,
    recentUpdates: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const vRes = await fetch(`${API_URL}/api/villages`);
        const villages = await vRes.json();

        const aRes = await fetch(`${API_URL}/api/announcements`);
        const announcements = await aRes.json();

        setStats({
          totalVillages: villages.length,
          totalAnnouncements: announcements.length,
          recentUpdates: announcements.slice(0, 3).length,
        });
      } catch (err) {
        console.error("Error fetching dashboard data", err);
      }
    };
    fetchStats();
  }, []);

  const cards = [
    { title: "Total Villages", value: stats.totalVillages, icon: MapPin },
    { title: "Announcements", value: stats.totalAnnouncements, icon: Megaphone },
    { title: "Recent Updates", value: stats.recentUpdates, icon: TrendingUp },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map(({ title, value, icon: Icon }) => (
            <Card key={title}>
              <CardHeader className="flex items-center space-x-2">
                <Icon className="w-6 h-6 text-blue-600" />
                <CardTitle>{title}</CardTitle>
              </CardHeader>
              <CardContent className="text-4xl font-semibold text-center">
                {value}
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
