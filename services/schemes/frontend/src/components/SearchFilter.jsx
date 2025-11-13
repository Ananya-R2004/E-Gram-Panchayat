import React from 'react';

export default function SearchFilter({ categories, search, setSearch, category, setCategory }) {
  return (
    <div className="filter-bar">
      {/* 🔍 Search bar */}
      <input
        type="text"
        placeholder="Search schemes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      {/* 📂 Category dropdown */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="category-select"
      >
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}
