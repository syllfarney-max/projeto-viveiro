import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    mensagem: "",
  });
  const [status, setStatus] = useState("");

  // URL fixa do backend no Render
  const API_ROOT = "https://viveiro-comurg-backend-yjsj.onrender.com";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Enviando...");

    try {
      const response = await fetch(`${API_ROOT}/api/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Falha no envio");
      }

      setStatus("Mensagem enviada com sucesso!");
      setFormData({ nome: "", email: "", mensagem: "" });
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      setStatus("Erro de conexão com o servidor. Tente novamente.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          placeholder="Seu nome"
          required
        />
      </div>
      <div className="form-group">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Seu e-mail"
          required
        />
      </div>
      <div className="form-group">
        <textarea
          name="mensagem"
          value={formData.mensagem}
          onChange={handleChange}
          placeholder="Sua mensagem"
          required
        />
      </div>
      <button type="submit">Enviar Mensagem</button>
      {status && <p className="status-message">{status}</p>}
    </form>
  );
};

export default ContactForm;
