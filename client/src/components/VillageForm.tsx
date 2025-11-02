import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface Village {
  name: string;
  population: number;
  area: string;
  sarpanch: string;
  secretary: string;
  contactPhone: string;
  contactEmail: string;
  facilities: string;
  description?: string;
}

export default function VillageForm({
  village,
  onSubmit,
  onCancel,
}: {
  village?: Village;
  onSubmit: (data: Village) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<Village>({
    name: "",
    population: 0,
    area: "",
    sarpanch: "",
    secretary: "",
    contactPhone: "",
    contactEmail: "",
    facilities: "",
    description: "",
  });

  useEffect(() => {
    if (village) setFormData(village);
  }, [village]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "population" ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Village Name *</Label>
          <Input name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <Label>Population *</Label>
          <Input
            name="population"
            type="number"
            value={formData.population}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label>Area *</Label>
          <Input name="area" value={formData.area} onChange={handleChange} required />
        </div>
        <div>
          <Label>Sarpanch Name *</Label>
          <Input name="sarpanch" value={formData.sarpanch} onChange={handleChange} required />
        </div>
        <div>
          <Label>Secretary Name *</Label>
          <Input name="secretary" value={formData.secretary} onChange={handleChange} required />
        </div>
        <div>
          <Label>Contact Phone *</Label>
          <Input name="contactPhone" value={formData.contactPhone} onChange={handleChange} required />
        </div>
        <div>
          <Label>Contact Email *</Label>
          <Input name="contactEmail" value={formData.contactEmail} onChange={handleChange} required />
        </div>
        <div className="md:col-span-2">
          <Label>Facilities *</Label>
          <Input name="facilities" value={formData.facilities} onChange={handleChange} required />
        </div>
        <div className="md:col-span-2">
          <Label>Description</Label>
          <Input name="description" value={formData.description} onChange={handleChange} />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{village ? "Update" : "Add"} Village</Button>
      </div>
    </form>
  );
}
