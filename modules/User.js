const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "villager"], default: "villager" },
  adminId: { type: String, unique: true, sparse: true }
});

module.exports = mongoose.model("User", userSchema);
