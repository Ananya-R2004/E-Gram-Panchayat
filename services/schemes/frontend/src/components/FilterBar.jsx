import React from 'react';
export default function FilterBar({ search, setSearch, category, setCategory }) {
  return (
    <div className="filter-bar">
      <input type="text" placeholder="Search schemes..." value={search} onChange={e => setSearch(e.target.value)} />
      <select value={category} onChange={e => setCategory(e.target.value)}>
        <option value="">All Categories</option>
        <option value="women">Women</option>
        <option value="farmers">Farmers</option>
        <option value="children">Children</option>
        <option value="students">Students</option>
        <option value="physically disabled">Physically Disabled</option>
        <option value="widows">Widows</option>
        <option value="senior citizens">Senior Citizens</option>
      </select>
    </div>
  );
}
