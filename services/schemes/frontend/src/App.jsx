import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SchemeCard from './components/SchemeCard';
import SearchFilter from './components/SearchFilter';

export default function App() {
  const [schemes, setSchemes] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const categories = [
    'All',
    'Farmers',
    'Women',
    'Children',
    'Students',
    'Physically Disabled',
    'Widows',
    'Senior Citizens',
  ];

  // ✅ Fetch data from backend
  useEffect(() => {
    axios
      .get('http://localhost:5003/schemes') // 🔥 fixed endpoint (no /api)
      .then((res) => {
        setSchemes(res.data);
        setFiltered(res.data);
      })
      .catch((err) => console.error('Error fetching schemes:', err));
  }, []);

  // ✅ Apply search + filter
  useEffect(() => {
    let results = schemes;

    if (category !== 'All') {
      results = results.filter((scheme) => {
        const cat = scheme.category.toLowerCase();
        if (category === 'Physically Disabled')
          return cat.includes('disabled') || cat.includes('physically');
        if (category === 'Senior Citizens')
          return cat.includes('senior') || cat.includes('citizen');
        return cat === category.toLowerCase();
      });
    }

    if (search.trim()) {
      const query = search.toLowerCase();
      results = results.filter(
        (scheme) =>
          (scheme.name && scheme.name.toLowerCase().includes(query)) ||
          (scheme.eligibility && scheme.eligibility.toLowerCase().includes(query))
      );
    }

    setFiltered(results);
  }, [search, category, schemes]);

  return (
    <div className="container">
      <header>
        <h1>Schemes & Policy</h1>
        <p className="subtitle">
          Find government & private schemes by beneficiary type
        </p>
      </header>

      {/* ✅ Search + Filter */}
      <SearchFilter
        categories={categories}
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
      />

      {/* ✅ Scheme list */}
      <div className="grid">
        {filtered.length === 0 ? (
          <p className="no">No schemes found.</p>
        ) : (
          filtered.map((scheme) => (
            <SchemeCard key={scheme.id} scheme={scheme} />
          ))
        )}
      </div>
    </div>
  );
}
