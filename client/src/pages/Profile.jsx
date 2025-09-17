import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { requestPasswordOtp, changePassword } from "../utils/api";

const Profile = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    
    const [step, setStep] = useState(1); // 1: View Profile, 2: OTP, 3: New Password
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRequestOtp = async () => {
        setLoading(true);
        setMessage("");
        try {
            const res = await requestPasswordOtp(user.email);
            setMessage(res.data.message);
            setStep(2);
        } catch (err) {
            setMessage(err.response?.data?.error || "Failed to send OTP.");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyAndChangePassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmNewPassword) {
            setMessage("Passwords do not match.");
            return;
        }
        setLoading(true);
        setMessage("");
        try {
            const res = await changePassword(user.email, otp, newPassword);
            setMessage(res.data.message + " You will be logged out shortly.");
            
            // Clear local storage and log out
            setTimeout(() => {
                localStorage.clear();
                navigate("/login");
            }, 3000);
        } catch (err) {
            setMessage(err.response?.data?.error || "Invalid OTP or password change failed.");
        } finally {
            setLoading(false);
        }
    };
    
    const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    };

    if (!user) {
        return <div className="text-center mt-10">Please log in to view this page.</div>;
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <header className="bg-green-600 text-white p-4 flex justify-between items-center shadow">
                <div className="text-2xl font-bold">🌾 E-Gram Panchayat Portal</div>
                <div className="flex items-center space-x-4">
                    {/* This is the corrected line */}
                    <Link to="/" className="text-white hover:underline"> 
                        🏡 Home
                    </Link>
                    <button onClick={handleLogout} className="bg-white text-green-600 py-1 px-3 rounded">
                        Logout
                    </button>
                </div>
            </header>
            <main className="flex-grow flex justify-center items-center">
                <div className="bg-white p-8 rounded-xl shadow-md w-96">
                    <h2 className="text-2xl font-bold mb-6 text-center text-black">
                        {step === 1 ? "My Profile" : step === 2 ? "Verify OTP" : "Change Password"}
                    </h2>
                    {step === 1 && (
                        <>
                            <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <button onClick={handleRequestOtp} className="w-full bg-green-600 text-white p-2 rounded mt-4">
                                Change Password
                            </button>
                        </>
                    )}
                    {(step === 2 || step === 3) && (
                        <form onSubmit={handleVerifyAndChangePassword}>
                            <p className="mb-4 text-center text-gray-700">{step === 2 ? "An OTP has been sent to your email. Enter it below to proceed." : "Enter your new password."}</p>
                            
                            {step === 2 && (
                                <>
                                    <label className="block mb-2">Enter OTP</label>
                                    <input
                                        type="text"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        className="w-full p-2 border rounded-lg mb-4"
                                        required
                                    />
                                </>
                            )}
                            {step === 3 && (
                                <>
                                    <label className="block mb-2">New Password</label>
                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="w-full p-2 border rounded-lg mb-4"
                                        required
                                    />
                                    <label className="block mb-2">Confirm New Password</label>
                                    <input
                                        type="password"
                                        value={confirmNewPassword}
                                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                                        className="w-full p-2 border rounded-lg mb-4"
                                        required
                                    />
                                </>
                            )}
                            <button type="submit" disabled={loading} className="w-full bg-green-600 text-white p-2 rounded-lg">
                                {loading ? "Processing..." : step === 2 ? "Verify OTP" : "Change Password"}
                            </button>
                        </form>
                    )}
                    {message && <p className={`mt-4 text-center text-sm ${message.includes("successfully") ? "text-green-600" : "text-red-500"}`}>{message}</p>}
                </div>
            </main>
            <footer className="bg-gray-200 text-center py-3 text-sm text-gray-700">
                © 2025 E-Gram Panchayat | All Rights Reserved
            </footer>
        </div>
    );
};

export default Profile;