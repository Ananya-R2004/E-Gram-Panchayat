import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User.js";

interface JwtPayload {
  id: string;
}

// Extend Express Request type safely
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

// ✅ Check login token
export const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.startsWith("Bearer")
      ? req.headers.authorization.split(" ")[1]
      : null;

    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) return res.status(401).json({ message: "User not found" });

    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(401).json({ message: "Token invalid or expired" });
  }
};

// ✅ Only admin allowed
export const adminOnly = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};
