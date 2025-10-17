import React, { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Enviando...");

    try {
      const response = await fetch("https://viveiro-comurg-backend-34cj.onrender.com/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        setStatus("Mensagem enviada com sucesso!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("Erro ao enviar mensagem.");
      }
    } catch (error) {
      setStatus("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="container">
      <header className="header">
        <img src="/logo.png" alt="Comurg Logo" className="logo" />
        <h1>Viveiros ® Comurg</h1>
        <h3>Sustentabilidade e Meio Ambiente</h3>

        <div className="header-buttons">
          <a href="https://wa.me/5562999999999" target="_blank" rel="noopener noreferrer" className="btn">
            WhatsApp
          </a>
          <a href="/admin" className="btn">
            Área Administrativa
          </a>
        </div>
      </header>

      <main>
        <section className="content">
          <h2>Produção de mudas e soluções ambientais</h2>
          <p>Mudas para paisagismo, recuperação ambiental e projetos de reflorestamento.</p>

          <h3>Fale conosco</h3>
          <form onSubmit={handleSubmit}>
            <input name="name" placeholder="Seu nome" value={formData.name} onChange={handleChange} required />
            <input name="email" placeholder="Seu email" value={formData.email} onChange={handleChange} required />
            <textarea name="message" placeholder="Sua mensagem" value={formData.message} onChange={handleChange} required />
            <button type="submit">Enviar</button>
          </form>

          {status && <p className="status">{status}</p>}
        </section>
      </main>
    </div>
  );
}

export default App;

