export const API_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

// Reusable fetch helper
export async function fetchData(endpoint: string) {
  const res = await fetch(`${API_URL}${endpoint}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${endpoint}: ${res.statusText}`);
  }
  return res.json();
}
