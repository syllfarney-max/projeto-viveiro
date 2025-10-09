import React, { useState } from "react";
export default function App(){
  const [form,setForm]=useState({name:'',email:'',message:''});
  const [status,setStatus]=useState('');
  const handle=(e)=>setForm({...form,[e.target.name]:e.target.value});
  const submit=async (e)=>{e.preventDefault(); setStatus('Enviando...');
    try{ const r=await fetch(`${import.meta.env.VITE_API_URL}/send`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)});
      const j=await r.json(); setStatus(j.success? 'Mensagem enviada!': 'Erro: '+(j.error||'')); }catch{ setStatus('Erro de conexão'); }};
  return (<div style={{maxWidth:600,margin:'40px auto'}}><h1>Contato - Viveiro Comurg</h1>
    <form onSubmit={submit}><input name='name' placeholder='Nome' onChange={handle} required/><br/>
    <input name='email' type='email' placeholder='Email' onChange={handle} required/><br/>
    <textarea name='message' placeholder='Mensagem' onChange={handle} required/><br/>
    <button type='submit'>Enviar</button></form><p>{status}</p></div>);
}