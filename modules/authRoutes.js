const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./User");
const validAdminIds = require("./AdminList");

const router = express.Router();

// In-memory OTP store: phone -> {otp, expires}
const otpStore = {};

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send OTP
router.post("/send-otp", (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ error: "Phone required" });

  const otp = generateOTP();
  const expires = Date.now() + 5 * 60 * 1000; // 5 mins
  otpStore[phone] = { otp, expires };

  console.log(`OTP for ${phone}: ${otp}`); // For demo
  return res.json({ msg: "OTP sent. Check console for demo." });
});

// Verify OTP (before setting password)
router.post("/verify-otp", (req, res) => {
  const { phone, otp } = req.body;
  if (!otpStore[phone]) return res.status(400).json({ error: "OTP not sent" });

  const entry = otpStore[phone];
  if (Date.now() > entry.expires) return res.status(400).json({ error: "OTP expired" });
  if (entry.otp !== otp) return res.status(400).json({ error: "Incorrect OTP" });

  delete otpStore[phone];
  return res.json({ msg: "OTP verified" });
});

// Register
router.post("/register", async (req, res) => {
  const { name, phone, password, role, adminId } = req.body;

  if (!name || !phone || !password || !role)
    return res.status(400).json({ error: "All fields required" });

  try {
    const existing = await User.findOne({ phone });
    if (existing) return res.status(400).json({ error: "Phone already registered" });

    if (role === "admin") {
      if (!adminId || !validAdminIds.includes(adminId))
        return res.status(400).json({ error: "Invalid admin ID" });

      const used = await User.findOne({ adminId });
      if (used) return res.status(400).json({ error: "Admin ID already registered" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      phone,
      password: hashed,
      role,
      adminId: role === "admin" ? adminId : undefined
    });

    await user.save();
    res.json({ msg: "Registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { phone, password } = req.body;

  try {
    const user = await User.findOne({ phone });
    if (!user) return res.status(400).json({ error: "Invalid phone or password" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Invalid phone or password" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || "fallback_secret");

    res.json({ token, name: user.name, role: user.role });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
