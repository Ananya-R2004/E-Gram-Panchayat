import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";
import VillageForm from "@/components/VillageForm";
import { API_URL } from "@/lib/api";
import { Village } from "@shared/schema"; // ✅ use shared interface

export default function ManageVillages() {
  const [villages, setVillages] = useState<Village[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editVillage, setEditVillage] = useState<Village | undefined>();

  // Fetch all villages
  const fetchVillages = async () => {
    try {
      const res = await fetch(`${API_URL}/api/villages`);
      const data = await res.json();
      setVillages(data);
    } catch (err) {
      console.error("Failed to fetch villages:", err);
    }
  };

  useEffect(() => {
    fetchVillages();
  }, []);

  // Add or update village
  const handleSave = async (data: Village) => {
    try {
      const method = editVillage ? "PUT" : "POST";
      const url = editVillage
        ? `${API_URL}/api/villages/${editVillage._id}`
        : `${API_URL}/api/villages`;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to save village");

      setIsDialogOpen(false);
      setEditVillage(undefined);
      fetchVillages();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete village
  const handleDelete = async (id?: string) => {
    if (!id) return;
    try {
      await fetch(`${API_URL}/api/villages/${id}`, { method: "DELETE" });
      fetchVillages();
    } catch (err) {
      console.error("Failed to delete village:", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 p-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Village Details Management</h1>
            <p className="text-gray-500">Add, edit, or delete village information</p>
          </div>
          <Button onClick={() => { setEditVillage(undefined); setIsDialogOpen(true); }}>
            <Plus className="w-4 h-4 mr-2" /> Add Village
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Villages</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Population</TableHead>
                  <TableHead>Sarpanch</TableHead>
                  <TableHead>Secretary</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {villages.map((v) => (
                  <TableRow key={v._id}>
                    <TableCell>{v.name}</TableCell>
                    <TableCell>{v.population}</TableCell>
                    <TableCell>{v.sarpanch}</TableCell>
                    <TableCell>{v.secretary}</TableCell>
                    <TableCell>{v.contactPhone}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => { setEditVillage(v); setIsDialogOpen(true); }}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(v._id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editVillage ? "Edit Village" : "Add New Village"}</DialogTitle>
            </DialogHeader>
            <VillageForm
              village={editVillage}
              onSubmit={handleSave}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
