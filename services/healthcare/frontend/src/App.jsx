import React, {useEffect, useState} from 'react'
import HospitalList from './components/HospitalList'
import EmergencyInfo from './components/EmergencyInfo'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5055';

export default function App(){
  const [hospitals, setHospitals] = useState([]);
  const [query, setQuery] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchHospitals = async (q='', s='') => {
    setLoading(true);
    const params = new URLSearchParams();
    if(q) params.set('q', q);
    if(s) params.set('specialty', s);
    const res = await fetch(`${API}/api/hospitals?${params.toString()}`);
    const data = await res.json();
    setHospitals(data);
    setLoading(false);
  };

  useEffect(()=> {
    fetchHospitals();
  },[]);

  const onSearch = (e) => {
    e.preventDefault();
    fetchHospitals(query, specialty);
  };

  return (
    <div className="page">
      <header className="hero">
        <div>
          <h1>E‑Gram Healthcare</h1>
          <p className="tag">Find hospitals, emergency contacts & pre-hospital guidance</p>
        </div>
        <div className="searchBox">
          <form onSubmit={onSearch}>
            <input className="search" placeholder="Search by name, city, address..." value={query} onChange={e=>setQuery(e.target.value)} />
            <select value={specialty} onChange={e=>setSpecialty(e.target.value)}>
              <option value="">All Specialties</option>
              <option>Cardiology</option>
              <option>Nephrology</option>
              <option>Pediatrics</option>
              <option>Gynecology</option>
              <option>Orthopedics</option>
              <option>Emergency Medicine</option>
              <option>Neurology</option>
              <option>General Medicine</option>
            </select>
            <button className="btn" type="submit">Search</button>
          </form>
        </div>
      </header>

      <main className="container">
        <section className="left">
          <h2>Hospitals</h2>
          {loading ? <div>Loading…</div> : <HospitalList hospitals={hospitals} />}
        </section>
        <aside className="right">
          <EmergencyInfo apiBase={API} />
        </aside>
      </main>

      <footer className="footer">
        <small>Backend port: 5055 · Frontend dev port: 3005</small>
      </footer>
    </div>
  )
}
