const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  email: { type: String, unique: true, sparse: true },
  password: { type: String, required: true },
  otp: { type: String },
  otpExpiry: { type: Date },
  village: { type: String, required: true },
  district: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  role: { type: String, enum: ["villager", "admin"], default: "villager" },
  adminId: { type: String },
  googleId: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
