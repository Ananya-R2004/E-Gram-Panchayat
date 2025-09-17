// ... (existing imports)
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./User");
const { sendOTPEmail } = require("./email");
const validAdminIds = require("./AdminList");

const router = express.Router();

// NEW: COMBINED VERIFY-OTP ROUTE (MODIFIED)
router.post("/verify-otp", async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email) {
            return res.status(400).json({ error: "Email is required." });
        }

        const existingUser = await User.findOne({ email });

        // Case 1: OTP is provided -> VERIFY OTP
        if (otp) {
            if (!existingUser || existingUser.otp !== otp || existingUser.otpExpiry < Date.now()) {
                return res.status(400).json({ error: "Invalid or expired OTP." });
            }

            // Mark email as verified temporarily
            existingUser.isVerified = true;
            await existingUser.save({ validateBeforeSave: false }); // CRUCIAL: Skip validation here

            res.status(200).json({ message: "Email verified successfully." });
        }
        // Case 2: No OTP provided -> SEND OTP
        else {
            if (existingUser && existingUser.password) {
                // Check if the user is already fully registered
                return res.status(400).json({ error: "Email already registered." });
            }

            const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
            const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

            // Find and update existing unverified user or create a new temporary entry
            await User.findOneAndUpdate(
                { email },
                { email, otp: newOtp, otpExpiry, isVerified: false },
                { upsert: true, new: true, setDefaultsOnInsert: true, runValidators: false } // CRUCIAL: runValidators: false added here
            );

            await sendOTPEmail(email, newOtp);

            res.status(200).json({ message: "OTP sent to your email. Please verify to continue." });
        }
    } catch (err) {
        console.error("OTP process error:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// REGISTER (Modified)
router.post("/register", async (req, res) => {
    try {
        const { firstName, lastName, phone, email, password, village, district, state, country, role, adminId } = req.body;

        // Check if the email is already verified from the previous step
        const user = await User.findOne({ email, isVerified: true });
        if (!user) {
            return res.status(400).json({ error: "Email not verified. Please verify your email first." });
        }

        // Check for phone number duplication
        const existingPhoneUser = await User.findOne({ phone, email: { $ne: email } });
        if (existingPhoneUser) {
            return res.status(400).json({ error: "Phone number already registered." });
        }

        if (role === "admin" && (!validAdminIds || !validAdminIds.includes(adminId))) {
            return res.status(400).json({ error: "Invalid Admin ID." });
        }

        // Check for all required fields here before proceeding
        if (!firstName || !lastName || !phone || !password || !village || !district || !state || !country) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.firstName = firstName;
        user.lastName = lastName;
        user.phone = phone;
        user.password = hashedPassword;
        user.village = village;
        user.district = district;
        user.state = state;
        user.country = country;
        user.role = role;
        user.adminId = adminId;
        user.isVerified = true; // Final verification

        await user.save(); // Mongoose will now run validation on all fields

        res.status(201).json({ message: "Registered successfully. You can now log in." });
    } catch (err) {
        console.error("Register error:", err);
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
        
        // This is the check that will fail for your current DB entry
        if (!user.isVerified) return res.status(400).json({ error: "Please verify your email first." });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.json({ message: "Login successful", token, user });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// REQUEST PASSWORD RESET OTP
router.post("/request-password-otp", async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) return res.status(400).json({ error: "Email not found" });
        
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
        
        user.otp = otp;
        user.otpExpiry = otpExpiry;
        await user.save();
        await sendOTPEmail(email, otp);

        res.status(200).json({ message: "OTP sent to your email." });
    } catch (err) {
        console.error("Password OTP request error:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// CHANGE PASSWORD
router.post("/change-password", async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        const user = await User.findOne({ email });

        if (!user || user.otp !== otp || user.otpExpiry < Date.now()) {
            return res.status(400).json({ error: "Invalid or expired OTP." });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();

        res.status(200).json({ message: "Password updated successfully." });
    } catch (err) {
        console.error("Change password error:", err);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;