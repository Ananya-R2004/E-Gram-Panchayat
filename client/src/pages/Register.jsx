import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { sendOtp } from "../utils/api";

export default function Register() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("villager");
  const [adminId, setAdminId] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      await sendOtp(phone);
      navigate("/otp-verify", { state: { name, phone, role, adminId } });
    } catch (err) {
      setMsg(err.response?.data?.error || "Error sending OTP");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} /><br/>
      <input placeholder="Phone" value={phone} onChange={(e)=>setPhone(e.target.value)} /><br/>
      <select value={role} onChange={(e)=>setRole(e.target.value)}>
        <option value="villager">Villager</option>
        <option value="admin">Admin</option>
      </select><br/>
      {role==="admin" && <input placeholder="Admin ID" value={adminId} onChange={(e)=>setAdminId(e.target.value)} />}
      <button onClick={handleSendOtp}>Send OTP</button>
      <p>{msg}</p>
      <p><Link to="/">Back to Home</Link></p>

    </div>
  );
}
