import React from 'react'
import HospitalCard from './HospitalCard'

export default function HospitalList({hospitals}){
  if(!hospitals || hospitals.length === 0) return <div>No hospitals found.</div>
  return (
    <div className="grid">
      {hospitals.map(h => <HospitalCard key={h.id} h={h} />)}
    </div>
  )
}
