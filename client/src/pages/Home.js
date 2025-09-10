import React, { useState } from "react";
import "./Home.css";

export default function Home() {
  const [language, setLanguage] = useState("English");

  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">e-Gram Panchayat</div>
        <ul className="nav-links">
          <li>Home</li>
          <li>Services</li>
          <li>About</li>
          <li>Contact</li>
          <li>Login</li>
        </ul>

        {/* Language Dropdown */}
        <select
          className="language-select"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="English">English</option>
          <option value="Kannada">Kannada</option>
          <option value="Hindi">Hindi</option>
        </select>
      </nav>

      {/* Hero Section */}
      <div className="hero">
        <h1>Empowering Villages through Digital Governance</h1>
        <p className="about-text">
          e-Gram Panchayat brings transparency and convenience by providing easy
          access to services, records, and village meetings online.
        </p>

        {/* Announcements + Meeting side by side */}
        <div className="info-section">
          <div className="announcement-box">
            <h3>📢 Announcements</h3>
            <ul>
              <li>Village meeting scheduled on 15th September</li>
              <li>New water supply project approved</li>
              <li>Scholarship applications open for students</li>
            </ul>
          </div>

          <div className="meeting-box">
            <h3>💻 Village Meeting</h3>
            <p>Join live meetings with Panchayat members.</p>
            <button
              onClick={() => window.open("https://zoom.us/", "_blank")}
            >
              Join Meeting
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
