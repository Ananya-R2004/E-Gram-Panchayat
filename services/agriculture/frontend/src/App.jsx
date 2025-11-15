import React, { useState, useEffect } from "react";
import "./index.css";

function App() {
  const [weather, setWeather] = useState(null);
  const [cropFilter, setCropFilter] = useState("");
  const [vendors, setVendors] = useState([]);
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data on load
  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch("http://localhost:5025/api/weather?city=Bengaluru").then((res) =>
        res.json()
      ),
      fetch("http://localhost:5025/api/vendors").then((res) => res.json()),
      fetch("http://localhost:5025/api/crops").then((res) => res.json()),
    ])
      .then(([weatherData, vendorData, cropData]) => {
        setWeather(weatherData);
        setVendors(vendorData.vendors);
        setCrops(cropData.crops);
      })
      .catch((err) => console.error("Fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  const searchVendors = () => {
    const url = cropFilter
      ? `http://localhost:5025/api/vendors?crop=${cropFilter}`
      : `http://localhost:5025/api/vendors`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setVendors(data.vendors))
      .catch((err) => console.error("Search error:", err));
  };

  if (loading) {
    return (
      <div className="loading">
        <h2>Loading Dashboard...</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <header>
        <h1>Agriculture Dashboard - Bengaluru</h1>
      </header>

      {/* Weather Section */}
      {weather && (
        <section className="card weather-card">
          <h2>Weather Overview</h2>
          <div className="weather-details">
            <p>Temperature: {weather.temp_c} °C</p>
            <p>Condition: {weather.description}</p>
            <p>Humidity: {weather.humidity}%</p>
            <p>Wind: {weather.wind_kmph.toFixed(1)} km/h</p>
          </div>
        </section>
      )}

      {/* Vendors Section */}
      <section className="card vendor-section">
        <h2>Vendors List</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Filter by crop name"
            value={cropFilter}
            onChange={(e) => setCropFilter(e.target.value)}
          />
          <button onClick={searchVendors}>Search</button>
        </div>
        <div className="grid">
          {vendors.map((v) => (
            <div key={v.id} className="vendor-card card">
              <h3>{v.name}</h3>
              <p>Crops: {v.crops.join(", ")}</p>
              <p>Address: {v.address}</p>
              <p>Distance: {v.distance_km} km</p>
              <p>Contact: {v.contact}</p>
              <a
                className="map-link"
                href={`https://www.google.com/maps?q=${v.lat},${v.lng}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Map
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Crops Section */}
      <section className="card crop-section">
        <h2>Crop Information</h2>
        <div className="grid">
          {crops.map((c) => (
            <div key={c.name} className="crop-card card">
              <h3>{c.name}</h3>
              <p>{c.info}</p>
              <p>Vendors: {c.vendors.map((v) => v.name).join(", ")}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
