import React, { useState } from "react";

export default function Admin() {
  const [password, setPassword] = useState("");
  const [messages, setMessages] = useState(null);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // Validação de senha
    if (password.trim() !== "8865") {
      setError("Senha incorreta. Tente novamente.");
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "https://viveiro-comurg-backend-yjsj.onrender.com";
      console.log("🔗 Buscando mensagens em:", `${apiUrl}/messages`);

      const res = await fetch(`${apiUrl}/messages`);
      if (!res.ok) throw new Error("Falha ao conectar com o servidor.");

      const data = await res.json();
      console.log("✅ Dados recebidos:", data);

      if (!Array.isArray(data) || data.length === 0) {
        setMessages([]);
        setError("Nenhuma mensagem disponível.");
      } else {
        setMessages(data);
      }
    } catch (err) {
      console.error("❌ Erro ao obter mensagens:", err);
      setError("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h2>Área Administrativa</h2>

      {/* Formulário de login */}
      {!messages && (
        <form
          onSubmit={handleLogin}
          style={{ marginTop: "1rem", display: "inline-block", textAlign: "left" }}
        >
          <label>
            Senha:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite 8865"
              style={{
                display: "block",
                marginTop: "0.5rem",
                padding: "0.5rem",
                width: "200px",
              }}
              required
            />
          </label>
          <button
            type="submit"
            style={{
              display: "block",
              marginTop: "1rem",
              padding: "0.5rem 1rem",
              backgroundColor: "#2f7a4a",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Entrar
          </button>
        </form>
      )}

      {/* Mensagens ou erros */}
      {error && (
        <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>
      )}

      {messages && (
        <div style={{ marginTop: "2rem", maxWidth: "600px", marginInline: "auto", textAlign: "left" }}>
          <h3>📬 Mensagens recebidas</h3>
          {messages.length === 0 ? (
            <p>Nenhuma mensagem disponível.</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {messages.map((m, i) => (
                <li key={i} style={{ borderBottom: "1px solid #ccc", marginBottom: "1rem", paddingBottom: "0.5rem" }}>
                  <strong>Nome:</strong> {m.name} <br />
                  <strong>Email:</strong> {m.email} <br />
                  <strong>Mensagem:</strong> {m.message}
                </li>
              ))}
            </ul>
          )}
          <button
            onClick={() => {
              setMessages(null);
              setPassword("");
              setError("");
            }}
            style={{
              marginTop: "1rem",
              backgroundColor: "#1f5c39",
              color: "#fff",
              padding: "0.4rem 1rem",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Voltar
          </button>
        </div>
      )}
    </div>
  );
}
