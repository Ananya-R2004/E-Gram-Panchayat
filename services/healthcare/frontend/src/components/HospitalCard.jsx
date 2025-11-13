import React from 'react'

export default function HospitalCard({h}){
  return (
    <div className="card">
      <div className="cardHeader">
        <h3>{h.name}</h3>
        <div className="rating">{h.rating} ★</div>
      </div>
      <p className="muted">{h.address}, {h.city}</p>
      <p><strong>Phone:</strong> <a href={`tel:${h.phone}`}>{h.phone}</a></p>
      <p><strong>Emergency:</strong> <a href={`tel:${h.emergencyPhone}`}>{h.emergencyPhone}</a></p>
      <p><strong>Specialties:</strong> {h.specialties.join(', ')}</p>
      <p><strong>Timings:</strong> {h.timings} · <strong>Beds:</strong> {h.beds}</p>
      <div className="cardFooter">
        <a className="linkBtn" href={h.website} target="_blank" rel="noreferrer">Visit site</a>
      </div>
    </div>
  )
}
