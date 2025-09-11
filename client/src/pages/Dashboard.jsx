import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
      <p>Login/Register Successful!</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
}
