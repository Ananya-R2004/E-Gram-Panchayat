import React from 'react';

export default function SchemeCard({ scheme }) {
  return (
    <div className="scheme-card">
      <h2>{scheme.name}</h2>
      <p><strong>Category:</strong> {scheme.category}</p>
      <p><strong>Eligibility:</strong> {scheme.eligibility}</p>
      <p><strong>Benefits:</strong> {scheme.benefits}</p>
      <p><strong>Application Process:</strong> {scheme.applicationProcess}</p>
      <p><strong>Required Documents:</strong> {scheme.documents}</p>
      <p><strong>Contact:</strong> {scheme.contact}</p>
    </div>
  );
}
