import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SchemeCard from './components/SchemeCard';
import SearchFilter from './components/SearchFilter';

export default function App() {
  const [schemes, setSchemes] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const categories = ['All', 'Farmers','Women','Children','Students','Physically Disabled','Widows','Senior Citizens'];

  useEffect(() => {
    axios.get('http://localhost:5003/api/schemes')
      .then(res => {
        setSchemes(res.data);
        setFiltered(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    let r = schemes;
    if (category !== 'All') {
      r = r.filter(s => {
        const cat = s.category.toLowerCase();
        if (category === 'Physically Disabled') return cat.includes('disabled') || cat.includes('physically');
        if (category === 'Senior Citizens') return cat.includes('senior') || cat.includes('citizen');
        return cat === category.toLowerCase();
      });
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      r = r.filter(s => (s.name && s.name.toLowerCase().includes(q)) || (s.eligibility && s.eligibility.toLowerCase().includes(q)));
    }
    setFiltered(r);
  }, [search, category, schemes]);

  return (
    <div className="container">
      <header>
        <h1>Schemes & Policy</h1>
        <p className="subtitle">Find government & private schemes by beneficiary type</p>
      </header>

      <SearchFilter
        categories={categories}
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
      />

      <div className="grid">
        {filtered.length === 0 ? <p className="no">No schemes found.</p> : filtered.map(s => <SchemeCard key={s.id} scheme={s} />)}
      </div>
    </div>
  );
}
