import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register, verifyOtp as verifyEmailOtp } from "../utils/api";

const Register = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        firstName: "", lastName: "", phone: "", email: "", password: "", confirmPassword: "",
        village: "", district: "", state: "", country: "", role: "villager", adminId: "",
    });
    const [otp, setOtp] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");
    const allowedAdminIds = ["PANCH001", "PANCH002", "PANCH003", "ADMIN001", "ADMIN002"];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        // Reset OTP state if email changes
        if (name === "email") {
            setIsOtpSent(false);
            setIsEmailVerified(false);
        }
    };

    const handleSendOtp = async () => {
        setLoading(true);
        setMsg("");
        try {
            const res = await verifyEmailOtp(form.email);
            setMsg(res.data.message);
            setIsOtpSent(true);
        } catch (err) {
            setMsg(err.response?.data?.error || "Failed to send OTP.");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        setLoading(true);
        setMsg("");
        try {
            const res = await verifyEmailOtp(form.email, otp);
            setMsg(res.data.message);
            setIsEmailVerified(true);
        } catch (err) {
            setMsg(err.response?.data?.error || "Invalid or expired OTP.");
        } finally {
            setLoading(false);
        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMsg("");

        if (!isEmailVerified) {
            setMsg("Please verify your email first.");
            setLoading(false);
            return;
        }

        if (form.password !== form.confirmPassword) {
            setMsg("Passwords do not match!");
            setLoading(false);
            return;
        }
        if (form.role === "admin" && !allowedAdminIds.includes(form.adminId)) {
            setMsg("Invalid Admin ID!");
            setLoading(false);
            return;
        }

        try {
            const res = await register(form);
            setMsg(res.data.message);
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (err) {
            setMsg(err.response?.data?.error || "Registration failed!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-green-50">
            <header className="w-full bg-green-700 text-white py-4 shadow-md">
                <h1 className="text-center text-2xl font-bold">🌿 E-Gram Panchayat</h1>
            </header>
            <main className="flex-grow flex justify-center items-center">
                <div className="bg-white shadow-xl rounded-2xl p-10 w-[850px] border border-green-300 mt-10 mb-10">
                    <h2 className="text-3xl font-bold text-green-700 text-center mb-8">Register</h2>
                    {msg && (
                        <p className={`text-center mb-4 ${msg.includes("successfully") ? "text-green-600" : "text-red-500"}`}>
                            {msg}
                        </p>
                    )}
                    <form onSubmit={handleRegisterSubmit}>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                            <div><label className="block font-medium mb-1">First Name *</label><input name="firstName" type="text" value={form.firstName} onChange={handleChange} className="w-full border rounded-lg p-3" required /></div>
                            <div><label className="block font-medium mb-1">Last Name *</label><input name="lastName" type="text" value={form.lastName} onChange={handleChange} className="w-full border rounded-lg p-3" required /></div>
                        </div>
                        <div className="mt-6"><label className="block font-medium mb-1">Phone Number *</label><input name="phone" type="tel" value={form.phone} onChange={handleChange} className="w-full border rounded-lg p-3" required /></div>
                        
                        {/* Email and OTP Section */}
                        <div className="mt-6">
                            <label className="block font-medium mb-1">Email *</label>
                            <div className="flex items-center space-x-2">
                                <input
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg p-3"
                                    placeholder="Enter your email"
                                    required
                                    disabled={isEmailVerified}
                                />
                                {isEmailVerified ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={handleSendOtp}
                                        disabled={loading || !form.email}
                                        className="bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition flex-shrink-0"
                                    >
                                        {loading ? "Sending..." : "Send OTP"}
                                    </button>
                                )}
                            </div>
                            {isOtpSent && !isEmailVerified && (
                                <div className="mt-4 flex items-center space-x-2">
                                    <input
                                        type="text"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        className="w-full p-3 border rounded-lg"
                                        placeholder="Enter OTP"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={handleVerifyOtp}
                                        disabled={loading || !otp}
                                        className="bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition flex-shrink-0"
                                    >
                                        {loading ? "Verifying..." : "Verify"}
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-x-6 gap-y-4 mt-6">
                            <div><label className="block font-medium mb-1">Password *</label><input name="password" type="password" value={form.password} onChange={handleChange} className="w-full border rounded-lg p-3" required /></div>
                            <div><label className="block font-medium mb-1">Confirm Password *</label><input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} className="w-full border rounded-lg p-3" required /></div>
                        </div>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-4 mt-6">
                            <div><label className="block font-medium mb-1">Village *</label><input name="village" type="text" value={form.village} onChange={handleChange} className="w-full border rounded-lg p-3" required /></div>
                            <div><label className="block font-medium mb-1">District *</label><input name="district" type="text" value={form.district} onChange={handleChange} className="w-full border rounded-lg p-3" required /></div>
                            <div><label className="block font-medium mb-1">State *</label><input name="state" type="text" value={form.state} onChange={handleChange} className="w-full border rounded-lg p-3" required /></div>
                            <div><label className="block font-medium mb-1">Country *</label><input name="country" type="text" value={form.country} onChange={handleChange} className="w-full border rounded-lg p-3" required /></div>
                        </div>
                        <div className="mt-6">
                            <label className="block font-medium mb-1">Role *</label>
                            <select name="role" value={form.role} onChange={handleChange} className="w-full border rounded-lg p-3" required>
                                <option value="villager">Villager</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        {form.role === "admin" && (
                            <div className="mt-6"><label className="block font-medium mb-1">Admin ID *</label><input name="adminId" type="text" value={form.adminId} onChange={handleChange} className="w-full border rounded-lg p-3" required /></div>
                        )}
                        <button type="submit" disabled={loading || !isEmailVerified} className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg mt-8 hover:bg-green-700 transition">
                            {loading ? "Registering..." : "Register"}
                        </button>
                    </form>
                </div>
            </main>
            <footer className="w-full bg-gray-200 text-center py-3 text-sm text-gray-700">
                © 2025 E-Gram Panchayat | All Rights Reserved
            </footer>
        </div>
    );
};

export default Register;