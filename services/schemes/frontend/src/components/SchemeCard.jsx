import React from 'react';
export default function SchemeCard({ scheme }) {
  return (
    <div className="scheme-card">
      <h2>{scheme.name}</h2>
      <p><strong>Category:</strong> {scheme.category}</p>
      <p><strong>Eligibility:</strong> {scheme.eligibility}</p>
      <p><strong>Benefits:</strong> {scheme.benefits}</p>
      <p><strong>Process:</strong> {scheme.process}</p>
      <p><strong>Documents:</strong> {scheme.documents.join(', ')}</p>
      <p><strong>Contact:</strong> {scheme.contact}</p>
      <a href={scheme.link} target="_blank" rel="noopener noreferrer">Apply Now</a>
    </div>
  );
}
