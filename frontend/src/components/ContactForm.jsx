import React, {useState} from 'react'

export default function ContactForm(){
  const [form,setForm] = useState({name:'',email:'',message:''})
  const [status,setStatus] = useState('')

  const handle = (e) => setForm({...form, [e.target.name]: e.target.value})

  const submit = async (e) => {
    e.preventDefault()
    setStatus('Enviando...')
    try {
      const res = await fetch(import.meta.env.VITE_API_URL + '/send', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(form)
      })
      const j = await res.json()
      setStatus(j.message || 'Resposta recebida')
      if (j.success) setForm({name:'',email:'',message:''})
    } catch (err) {
      setStatus('Erro de conexão com o servidor.')
    }
  }

  return (
    <form onSubmit={submit}>
      <input name="name" placeholder="Nome" value={form.name} onChange={handle} required />
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handle} required />
      <textarea name="message" rows="5" placeholder="Mensagem" value={form.message} onChange={handle} required></textarea>
      <button type="submit">Enviar</button>
      <p style={{color:'#2f7a4a', marginTop:8}}>{status}</p>
    </form>
  )
}
