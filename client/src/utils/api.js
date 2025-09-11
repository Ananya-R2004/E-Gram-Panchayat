import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api/auth" });

export const sendOtp = (phone) => API.post("/send-otp", { phone });
export const verifyOtp = (phone, otp) => API.post("/verify-otp", { phone, otp });
export const register = (data) => API.post("/register", data);
export const login = (data) => API.post("/login", data);
