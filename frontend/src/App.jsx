import { useState } from 'react';
import axios from 'axios';

function App() {
  const [form, setForm] = useState({ nome: '', email: '', mensagem: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://viveiro-comurg-backend-yjsj.onrender.com/api/contato', form);
      setStatus(res.data.mensagem || 'Mensagem enviada!');
    } catch (err) {
      setStatus('Erro ao enviar.');
    }
  };

  return (
    <div style={{ fontFamily: 'Arial', margin: '2rem' }}>
      <h1>Viveiro COMURG</h1>
      <form onSubmit={handleSubmit}>
        <input name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} /><br />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} /><br />
        <textarea name="mensagem" placeholder="Mensagem" value={form.mensagem} onChange={handleChange} /><br />
        <button type="submit">Enviar</button>
      </form>
      <p>{status}</p>
    </div>
  );
}

export default App;
