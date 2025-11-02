import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";
import AnnouncementForm from "@/components/AnnouncementForm";
import type { Announcement, InsertAnnouncement } from "@shared/schema";
import { API_URL } from "@/lib/api";
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState<Announcement | undefined>();

  const authHeaders = (extra?: Record<string, string>) => {
    const token = localStorage.getItem("userToken");
    const base: Record<string, string> = { "Content-Type": "application/json" };
    if (token) base["Authorization"] = `Bearer ${token}`;
    return { ...base, ...(extra || {}) };
  };

  const load = async () => {
    try {
      const res = await fetch(`${API_URL}/api/announcements`, { headers: authHeaders() });
      if (!res.ok) {
        console.error("Failed to load announcements:", res.status, await res.text());
        return;
      }
      const data = await res.json();
      setAnnouncements(data);
    } catch (err) {
      console.error("Network error while loading announcements:", err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const create = async (data: InsertAnnouncement) => {
    try {
      const res = await fetch(`${API_URL}/api/announcements`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(await res.text());
      await load();
    } catch (err) {
      console.error("Error creating announcement:", err);
      alert("Error creating announcement. See console for details.");
    }
  };

  const update = async (id: string, data: InsertAnnouncement) => {
    try {
      const res = await fetch(`${API_URL}/api/announcements/${id}`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(await res.text());
      await load();
    } catch (err) {
      console.error("Error updating announcement:", err);
      alert("Error updating announcement. See console for details.");
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this announcement?")) return;
    try {
      const res = await fetch(`${API_URL}/api/announcements/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      if (!res.ok) throw new Error(await res.text());
      await load();
    } catch (err) {
      console.error("Error deleting announcement:", err);
      alert("Error deleting announcement. See console for details.");
    }
  };

  const handleSubmit = (data: InsertAnnouncement) => {
    edit ? update(edit._id!, data) : create(data);
    setOpen(false);
    setEdit(undefined);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* ✅ Sidebar added */}
      <AdminSidebar />

      <main className="flex-1 p-10">
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold">Manage Announcements</h1>
          <Button onClick={() => { setEdit(undefined); setOpen(true); }}>
            <Plus className="mr-2 h-4 w-4" /> Create Announcement
          </Button>
        </div>

        <div className="space-y-4">
          {announcements.map((a) => (
            <Card key={a._id}>
              <CardHeader className="flex justify-between">
                <CardTitle>{a.title}</CardTitle>
                <div className="flex gap-2">
                  <Button variant="ghost" onClick={() => { setEdit(a); setOpen(true); }}>
                    <Pencil />
                  </Button>
                  <Button variant="ghost" onClick={() => remove(a._id!)}>
                    <Trash2 className="text-red-600" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p>{a.description}</p>
              </CardContent>
            </Card>
          ))}
          {announcements.length === 0 && (
            <p className="text-muted-foreground">No announcements yet.</p>
          )}
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{edit ? "Edit" : "Create"} Announcement</DialogTitle>
            </DialogHeader>
            <AnnouncementForm
              announcement={edit}
              onSubmit={handleSubmit}
              onCancel={() => setOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
