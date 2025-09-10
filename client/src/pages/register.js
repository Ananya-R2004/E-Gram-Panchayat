 import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [form,setForm]=useState({name:"",email:"",password:"",role:"villager",village:{name:"",district:"",state:""}});
  
  const handleChange=(e)=>{
    const {name,value}=e.target;
    if(name==="villageName"||name==="district"||name==="state"){
      setForm({...form,village:{...form.village,[name==="villageName"?"name":name]:value}});
    }else{
      setForm({...form,[name]:value});
    }
  }

  const submit=async()=>{
    await axios.post("http://localhost:5000/api/auth/register",form);
    alert("Registered");
  }

  return(
    <div>
      <h2>Register</h2>
      <input name="name" placeholder="Name" onChange={handleChange}/>
      <input name="email" placeholder="Email" onChange={handleChange}/>
      <input type="password" name="password" placeholder="Password" onChange={handleChange}/>
      <select name="role" onChange={handleChange}>
        <option value="villager">Villager</option>
        <option value="admin">Admin</option>
      </select>
      <input name="villageName" placeholder="Village Name" onChange={handleChange}/>
      <input name="district" placeholder="District" onChange={handleChange}/>
      <input name="state" placeholder="State" onChange={handleChange}/>
      <button onClick={submit}>Submit</button>
    </div>
  )
}
