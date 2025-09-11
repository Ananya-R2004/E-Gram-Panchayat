import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOtp, register } from "../utils/api";

export default function OTPVerify() {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, phone, role, adminId } = location.state || {};
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleVerify = async () => {
    try {
      await verifyOtp(phone, otp);
      await register({ name, phone, password, role, adminId });
      navigate("/");
    } catch (err) {
      setMsg(err.response?.data?.error || "Verification failed");
    }
  };

  return (
    <div>
      <h2>Enter OTP for {phone}</h2>
      <input placeholder="OTP" value={otp} onChange={e=>setOtp(e.target.value)} /><br/>
      <input placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} type="password" /><br/>
      <button onClick={handleVerify}>Verify & Register</button>
      <p>{msg}</p>
      <p><a href="/">Back to Home</a></p>
    </div>
  );
}
