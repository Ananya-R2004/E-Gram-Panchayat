// shared/schema.ts
export type UserRole = "villager" | "admin";

/* -------------------- ANNOUNCEMENTS -------------------- */
export interface Announcement {
  _id?: string; // ✅ optional since it's created by MongoDB
  title: string;
  description: string;
  date?: string;
  postedBy?: string;
  image?: string;
}

export type InsertAnnouncement = Omit<Announcement, "_id" | "date">;

/* -------------------- VILLAGES -------------------- */
export interface Village {
  _id?: string; // ✅ optional now
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

export type InsertVillage = Omit<Village, "_id">;
