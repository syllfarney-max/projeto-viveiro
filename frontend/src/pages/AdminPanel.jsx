// frontend/src/pages/Admin.jsx
import { useState } from "react";

export default function Admin() {
  const [password, setPassword] = useState("");
  const [messages, setMessages] = useState(null);
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setMessages(null);

    // Verifica senha
    if (!password || password.trim() !== "8865") {
      setError("Senha incorreta. Tente novamente.");
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "https://viveiro-comurg-backend-yjsj.onrender.com";
      const response = await fetch(`${apiUrl}/messages`);
      if (!response.ok) throw new Error("Erro ao conectar com o backend");

      const data = await response.json();
      if (!data || data.length === 0) {
        setError("Nenhuma mensagem disponível.");
        setMessages([]);
        return;
      }

      setMessages(data);
    } catch (err) {
      console.error("Erro no Admin:", err);
      setError("Erro ao conectar com o servidor.");
    }
  }

  return (
    <div className="admin" style={{ textAlign: "center", padding: "2rem" }}>
      <h2>Área Administrativa</h2>

      {!messages && (
        <form
          onSubmit={handleLogin}
          style={{
            marginTop: "1rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <input
            type="password"
            placeholder="Digite a senha (8865)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: "0.5rem",
              width: "200px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "0.5rem 1rem",
              cursor: "pointer",
              backgroundColor: "#2f7a4a",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              marginTop: "0.5rem",
            }}
          >
            Entrar
          </button>
        </form>
      )}

      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}

      {messages && (
        <div style={{ marginTop: "2rem", textAlign: "left", maxWidth: "600px", margin: "2rem auto" }}>
          <h3>📩 Mensagens recebidas:</h3>
          {messages.length === 0 ? (
            <p>Nenhuma mensagem disponível.</p>
          ) : (
            <ul>
              {messages.map((m, i) => (
                <li key={i} style={{ borderBottom: "1px solid #ccc", padding: "0.5rem 0" }}>
                  <strong>Nome:</strong> {m.name} <br />
                  <strong>Email:</strong> {m.email} <br />
                  <strong>Mensagem:</strong> {m.message} <br />
                  <small>{new Date(m.date).toLocaleString()}</small>
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
              color: "white",
              border: "none",
              padding: "0.4rem 1rem",
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
