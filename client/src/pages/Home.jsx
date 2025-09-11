// src/pages/Home.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import bgImage from "../assets/village-bg.jpg"; // make sure this image exists

export default function Home() {
  const [language, setLanguage] = useState("English");

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Page content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navbar */}
        <nav className="bg-green-700 bg-opacity-90 text-white flex justify-between items-center px-8 py-4 shadow-lg">
          <div className="text-2xl font-bold">e-Gram Panchayat</div>
          <ul className="flex gap-8 font-medium">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/services" className="hover:underline">Services</Link></li>
            <li><Link to="/about" className="hover:underline">About</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
            <li><Link to="/login" className="hover:underline">Login</Link></li>
          </ul>
          <select
            className="bg-green-500 text-white px-2 py-1 rounded"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="English">English</option>
            <option value="Kannada">Kannada</option>
            <option value="Hindi">Hindi</option>
          </select>
        </nav>

        {/* Hero Section */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16">
          <h1 className="text-5xl font-bold mb-4 text-white drop-shadow-lg">
            Empowering Villages through Digital Governance
          </h1>
          <p className="text-lg max-w-2xl mb-12 text-gray-100">
            e-Gram Panchayat brings transparency and convenience by providing easy access
            to services, records, and village meetings online.
          </p>

          {/* Info Sections */}
          <div className="mt-8 flex gap-8 flex-wrap justify-center">
            {/* Announcements */}
            <div className="bg-white/90 shadow-lg p-6 rounded-lg w-80">
              <h3 className="font-bold mb-2 text-lg text-green-900">📢 Announcements</h3>
              <ul className="list-disc list-inside text-left text-gray-800">
                <li>Village meeting scheduled on 15th September</li>
                <li>New water supply project approved</li>
                <li>Scholarship applications open for students</li>
              </ul>
            </div>

            {/* Meeting */}
            <div className="bg-white/90 shadow-lg p-6 rounded-lg w-80 text-center">
              <h3 className="font-bold mb-2 text-lg text-green-900">💻 Village Meeting</h3>
              <p className="text-gray-800">Join live meetings with Panchayat members.</p>
              <button
                onClick={() => window.open("https://zoom.us/", "_blank")}
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
              >
                Join Meeting
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
