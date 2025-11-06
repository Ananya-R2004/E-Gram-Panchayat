import { Link, useLocation } from "wouter";
import { Home, MapPin, Megaphone } from "lucide-react";

export default function AdminSidebar() {
  const [location] = useLocation();

  const linkClasses = (path: string) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${
      location === path
        ? "bg-blue-600 text-white shadow-sm"
        : "text-gray-700 hover:bg-blue-100"
    }`;

  return (
    <aside className="h-screen w-64 bg-white border-r shadow-sm flex flex-col justify-between">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-8 text-gray-800">e-Grampanchayat</h1>
        <nav className="space-y-2">
          <Link href="/admin/dashboard">
            <div className={linkClasses("/admin/dashboard")}>
              <Home className="w-5 h-5" />
              <span>Dashboard</span>
            </div>
          </Link>
          <Link href="/admin/villages">
            <div className={linkClasses("/admin/villages")}>
              <MapPin className="w-5 h-5" />
              <span>Village Details</span>
            </div>
          </Link>
          <Link href="/admin/announcements">
            <div className={linkClasses("/admin/announcements")}>
              <Megaphone className="w-5 h-5" />
              <span>Announcements</span>
            </div>
          </Link>
        </nav>
      </div>

      <div className="p-6 border-t text-sm text-gray-500">
        Admin Panel
      </div>
    </aside>
  );
}
