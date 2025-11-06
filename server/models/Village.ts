import mongoose from "mongoose";

const villageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  population: { type: Number, required: true },
  area: { type: String, required: true },
  sarpanch: { type: String, required: true },
  secretary: { type: String, required: true },
  contactPhone: { type: String, required: true },
  contactEmail: { type: String, required: true },
  facilities: { type: String, required: true },
  description: { type: String },
});

export default mongoose.model("Village", villageSchema);
