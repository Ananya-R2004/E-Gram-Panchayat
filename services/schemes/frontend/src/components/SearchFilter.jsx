import React from 'react';

export default function SearchFilter({ categories, search, setSearch, category, setCategory }) {
  return (
    <div className="controls">
      <input
        className="search"
        placeholder="Search schemes by name or eligibility..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="category-buttons">
        {categories.map(c => (
          <button
            key={c}
            className={`cat-btn ${category === c ? 'active' : ''}`}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
