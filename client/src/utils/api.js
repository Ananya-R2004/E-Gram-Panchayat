import axios from "axios";

// No hardcoded localhost here
const API = axios.create({ baseURL: "http://localhost:5000/api/auth" });

// This function handles the final registration
export const register = (data) => API.post("/register", data);

// This function handles both sending and verifying the OTP
export const verifyOtp = (email, otp) => {
    if (otp) {
        return API.post("/verify-otp", { email, otp });
    } else {
        return API.post("/verify-otp", { email });
    }
};

// Existing login and password reset functions
export const login = (data) => API.post("/login", data);
export const requestPasswordOtp = (email) => API.post("/request-password-otp", { email });
export const changePassword = (email, otp, newPassword) => API.post("/change-password", { email, otp, newPassword });