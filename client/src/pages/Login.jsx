import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../utils/api";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login({ phone, password });
      navigate("/");
    } catch (err) {
      setMsg(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Phone" value={phone} onChange={(e)=>setPhone(e.target.value)} /><br/>
      <input placeholder="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} /><br/>
      <button onClick={handleLogin}>Login</button>
      <p>{msg}</p>
      <p><Link to="/">Back to Home</Link></p>

    </div>
  );
}
