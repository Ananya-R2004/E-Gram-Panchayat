import { Request, Response } from "express";
import User, { IUser } from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// -------------------- REGISTER --------------------
export const registerUser = async (req: Request, res: Response) => {
  try {
    const {
      fullName,
      email,
      phone,
      village,
      password,
      role,
      adminCode,
    } = req.body;

    // ✅ Basic validation
    if (!fullName || !email || !phone || !village || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // ✅ Handle Admin Registration
    if (role === "admin") {
      const correctAdminCode = process.env.ADMIN_CODE || "admin1234";

      if (!adminCode) {
        return res
          .status(400)
          .json({ message: "Admin code is required for admin registration" });
      }

      if (adminCode !== correctAdminCode) {
        return res.status(403).json({ message: "Invalid admin code" });
      }
    }

    // ✅ Create user (role auto-adjusted)
    const user = await User.create({
      name: fullName, // 🔥 consistent with frontend
      email,
      phone,
      village,
      password,
      role: role === "admin" ? "admin" : "villager",
    });

    const token = generateToken(String(user._id));

    return res.status(201).json({
      _id: user._id,
      fullName: user.name,
      email: user.email,
      phone: user.phone,
      village: user.village,
      role: user.role,
      token,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res
      .status(500)
      .json({ message: "Server error during registration" });
  }
};

// -------------------- LOGIN --------------------
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = (await User.findOne({ email })) as IUser | null;

    if (user && (await user.matchPassword(password))) {
      const token = generateToken(String(user._id));
      return res.json({
        _id: user._id,
        fullName: user.name,
        email: user.email,
        phone: user.phone,
        village: user.village,
        role: user.role,
        token,
      });
    }

    return res.status(401).json({ message: "Invalid email or password" });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error during login" });
  }
};

// -------------------- GET PROFILE --------------------
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req.user as IUser)?._id;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(user);
  } catch (error) {
    console.error("Get profile error:", error);
    return res
      .status(500)
      .json({ message: "Server error while fetching profile" });
  }
};
