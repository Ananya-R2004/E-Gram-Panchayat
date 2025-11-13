import React from 'react';

export default function SchemeCard({ scheme }) {
  return (
    <div className="card">
      <div className="card-head">
        <h3>{scheme.name}</h3>
        <span className="cat">{scheme.category}</span>
      </div>
      <div className="card-body">
        <p><strong>Eligibility:</strong> {scheme.eligibility}</p>
        <p><strong>Benefits:</strong> {scheme.benefits}</p>
        <p><strong>Process:</strong> {scheme.process}</p>
        <p><strong>Documents:</strong> {Array.isArray(scheme.documents) ? scheme.documents.join(', ') : scheme.documents}</p>
        <p><strong>Contact:</strong> <a href={scheme.contact} target="_blank" rel="noreferrer">{scheme.contact}</a></p>
      </div>
    </div>
  );
}
