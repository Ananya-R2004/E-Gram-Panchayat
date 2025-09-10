const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["admin", "villager"], default: "villager" },
  adminId: { type: String, unique: true, sparse: true }, // Only for admins
  village: {
    name: String,
    district: String,
    state: String
  }
});

module.exports = mongoose.model("User", userSchema);