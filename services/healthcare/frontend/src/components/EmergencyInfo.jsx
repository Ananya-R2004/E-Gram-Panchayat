import React, {useEffect, useState} from 'react'

export default function EmergencyInfo({apiBase}){
  const [contacts, setContacts] = useState({});
  const [instructions, setInstructions] = useState({});
  const [cond, setCond] = useState('');

  useEffect(()=> {
    fetch(`${apiBase}/api/emergency`).then(r=>r.json()).then(setContacts);
    fetch(`${apiBase}/api/instructions`).then(r=>r.json()).then(setInstructions);
  },[]);

  const loadCondition = async (c) => {
    if(!c) return;
    const res = await fetch(`${apiBase}/api/instructions?condition=${encodeURIComponent(c)}`);
    if(res.ok){
      const js = await res.json();
      alert('Pre-hospital steps for ' + c + ':\n\n' + js.steps.join('\n'));
    } else {
      alert('No instructions found for ' + c);
    }
  }

  return (
    <div className="emergencyCard">
      <h3>Emergency Contacts</h3>
      <ul>
        <li><strong>Ambulance:</strong> {contacts.national_ambulance}</li>
        <li><strong>Police:</strong> {contacts.police}</li>
        <li><strong>Fire:</strong> {contacts.fire}</li>
        <li><strong>Poison Control:</strong> {contacts.poison_control}</li>
      </ul>

      <h4>Quick Pre‑hospital Guidance</h4>
      <div className="instButtons">
        <button onClick={()=>loadCondition('heart_attack')}>Heart Attack</button>
        <button onClick={()=>loadCondition('stroke')}>Stroke</button>
        <button onClick={()=>loadCondition('severe_bleeding')}>Severe Bleeding</button>
        <button onClick={()=>loadCondition('burns')}>Burns</button>
      </div>

      <p className="muted small">Tap a condition to view step-by-step instructions.</p>
    </div>
  )
}
