const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./User");
const { sendOTPEmail } = require("./email");
const router = express.Router();

// Example admin IDs
const allowedAdminIds = ["ADMIN123", "SUPER001"];

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, phone, email, password, village, district, state, country, role, adminId } = req.body;

    const existingUser = await User.findOne({ phone });
    if (existingUser) return res.status(400).json({ error: "Phone already registered" });

    if (role === "admin" && !allowedAdminIds.includes(adminId)) {
      return res.status(400).json({ error: "Invalid Admin ID" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let otp, otpExpiry;
    if (email) {
      otp = Math.floor(100000 + Math.random() * 900000).toString();
      otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 min
      await sendOTPEmail(email, otp);
    }

    const user = new User({
      firstName,
      lastName,
      phone,
      email,
      password: hashedPassword,
      otp,
      otpExpiry,
      village,
      district,
      state,
      country,
      role,
      adminId
    });

    await user.save();
    res.json({ message: "Registered successfully. Check your email for OTP if provided." });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { phone, password } = req.body;
    const user = await User.findOne({ phone });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || "devjwt", { expiresIn: "7d" });
    res.json({ message: "Login successful", token, user });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
