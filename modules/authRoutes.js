const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./User"); 
const validAdminIds = require("./AdminList");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password, role, village, adminId } = req.body;
  
  try {
    // Check if admin ID is required and valid
    if (role === "admin") {
      if (!adminId) {
        return res.status(400).json({ error: "Admin ID is required" });
      }
      
      if (!validAdminIds.includes(adminId)) {
        return res.status(400).json({ error: "Invalid admin ID" });
      }
      
      // Check if admin ID is already used
      const existingAdmin = await User.findOne({ adminId });
      if (existingAdmin) {
        return res.status(400).json({ error: "Admin ID already registered" });
      }
    }
    
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }
    
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ 
      name, 
      email, 
      password: hashed, 
      role, 
      adminId: role === "admin" ? adminId : undefined,
      village 
    });
    
    await user.save();
    res.json({ msg: "Registered successfully" });
  } catch (err) {
    res.status(400).json({ error: "Registration failed" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid email or password" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Invalid email or password" });

    const token = jwt.sign({ 
      id: user._id, 
      role: user.role 
    }, process.env.JWT_SECRET || "fallback_secret");
    
    res.json({ 
      token, 
      role: user.role, 
      name: user.name, 
      village: user.village 
    });
  } catch (err) {
    res.status(500).json({ error: "Server error during login" });
  }
});

module.exports = router;