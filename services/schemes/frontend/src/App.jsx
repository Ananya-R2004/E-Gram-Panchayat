import React, { useEffect, useState } from 'react';
import SchemeCard from './components/SchemeCard';
import FilterBar from './components/FilterBar';

export default function App() {
  const [schemes, setSchemes] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    const url = `http://localhost:4005/schemes?category=${category}&search=${search}`;
    fetch(url)
      .then(res => res.json())
      .then(data => setSchemes(data));
  }, [search, category]);

  return (
    <div className="container">
      <h1>Schemes & Policy Service</h1>
      <FilterBar search={search} setSearch={setSearch} category={category} setCategory={setCategory} />
      <div className="schemes-grid">
        {schemes.map(s => <SchemeCard key={s.id} scheme={s} />)}
      </div>
    </div>
  );
}
