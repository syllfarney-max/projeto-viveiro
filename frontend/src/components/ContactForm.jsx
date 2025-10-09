import React, { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      setStatus(result.message);
    } catch (err) {
      setStatus('Erro ao enviar mensagem.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto', background: '#fff', padding: '20px', borderRadius: '8px' }}>
      <input type="text" name="name" placeholder="Seu nome" value={formData.name} onChange={handleChange} required style={{ width: '100%', marginBottom: '10px', padding: '8px' }} />
      <input type="email" name="email" placeholder="Seu email" value={formData.email} onChange={handleChange} required style={{ width: '100%', marginBottom: '10px', padding: '8px' }} />
      <textarea name="message" placeholder="Mensagem" value={formData.message} onChange={handleChange} required style={{ width: '100%', marginBottom: '10px', padding: '8px' }}></textarea>
      <button type="submit" style={{ backgroundColor: '#2e7d32', color: '#fff', border: 'none', padding: '10px', borderRadius: '5px', width: '100%' }}>Enviar</button>
      <p style={{ textAlign: 'center', color: '#2e7d32', marginTop: '10px' }}>{status}</p>
    </form>
  );
}

export default ContactForm;
