import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../utils/api";

export default function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ phone: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleLogin = async () => {
        try {
            setLoading(true);
            const res = await login(form);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            
            // This is the key change: navigate to the root path "/"
            navigate("/"); 
        } catch (err) {
            setMsg(err.response?.data?.error || "Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-green-600 text-white p-4 text-center text-2xl font-bold shadow">
                🌾 E-Gram Panchayat Portal
            </header>

            {/* Content */}
            <main className="flex-grow flex justify-center items-center">
                <div className="bg-white p-8 rounded-xl shadow-md w-96">
                    <h2 className="text-2xl font-bold mb-6 text-center text-black">Login</h2>

                    <label className="block mb-2 text-sm font-medium text-black">Phone Number</label>
                    <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        className="w-full p-2 mb-4 border rounded"
                    />

                    <label className="block mb-2 text-sm font-medium text-black">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                        className="w-full p-2 mb-4 border rounded"
                    />

                    <button
                        onClick={handleLogin}
                        disabled={loading}
                        className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                    {msg && (
                        <p className="mt-4 text-sm text-center text-red-500">{msg}</p>
                    )}

                    <p className="mt-6 text-center text-sm text-black">
                        Not registered?{" "}
                        <Link to="/register" className="text-green-600 hover:underline">
                            Create an account
                        </Link>
                    </p>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-200 text-center py-3 text-sm text-gray-700">
                © 2025 E-Gram Panchayat | All Rights Reserved
            </footer>
        </div>
    );
}