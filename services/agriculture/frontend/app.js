const { useState, useEffect } = React;

function App() {
  const [weather, setWeather] = useState(null);
  const [cropFilter, setCropFilter] = useState('');
  const [vendors, setVendors] = useState([]);
  const [crops, setCrops] = useState([]);

  // Fetch data on load
  useEffect(() => {
    // Weather
    fetch('http://localhost:5000/api/weather?city=Bengaluru')
      .then(res => res.json())
      .then(data => setWeather(data));

    // All vendors (without filter) → show on load
    fetch('http://localhost:5000/api/vendors')
      .then(res => res.json())
      .then(data => setVendors(data.vendors));

    // Crops
    fetch('http://localhost:5000/api/crops')
      .then(res => res.json())
      .then(data => setCrops(data.crops));
  }, []);

  // Search by crop
  const searchVendors = () => {
    const url = cropFilter
      ? `http://localhost:5000/api/vendors?crop=${cropFilter}`
      : `http://localhost:5000/api/vendors`;

    fetch(url)
      .then(res => res.json())
      .then(data => setVendors(data.vendors));
  }

  return (
    <div className="container">
      <h1>Agriculture Dashboard - Bengaluru</h1>

      {/* Weather */}
      {weather && (
        <div className="card weather-card">
          <h2>Weather in {weather.city}</h2>
          <p>Temperature: {weather.temp_c}°C</p>
          <p>Condition: {weather.description}</p>
          <p>Humidity: {weather.humidity}% | Wind: {weather.wind_kmph.toFixed(1)} km/h</p>
        </div>
      )}

      {/* Vendors */}
      <div className="card">
        <h2>Vendors List</h2>
        <input
          type="text"
          placeholder="Enter crop name to filter"
          value={cropFilter}
          onChange={e => setCropFilter(e.target.value)}
        />
        <button onClick={searchVendors}>Search</button>

        <div className="grid">
          {vendors.map(v => (
            <div key={v.id} className="vendor-card card">
              <h3>{v.name}</h3>
              <p>Crops: {v.crops.join(', ')}</p>
              <p>Address: {v.address}</p>
              <p>Distance: {v.distance_km} km</p>
              <p>Contact: {v.contact}</p>
              <a className="map-link" href={`https://www.google.com/maps?q=${v.lat},${v.lng}`} target="_blank">Open Map</a>
            </div>
          ))}
        </div>
      </div>

      {/* Crops */}
      <div className="card">
        <h2>Crop Information</h2>
        <div className="grid">
          {crops.map(c => (
            <div key={c.name} className="crop-card card">
              <h3>{c.name}</h3>
              <p>{c.info}</p>
              <p>Vendors: {c.vendors.map(v=>v.name).join(', ')}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
