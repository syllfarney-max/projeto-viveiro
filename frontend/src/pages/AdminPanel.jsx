import { useState } from "react";

export default function Admin() {
  const [password, setPassword] = useState("");
  const [messages, setMessages] = useState(null);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); // 🔹 impede reload da página
    setError("");
    setMessages(null);

    // senha simples (admin 8865)
    if (password !== "8865" && password !== "admin 8865") {
      setError("Senha incorreta.");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/messages`);
      if (!res.ok) throw new Error("Erro ao conectar ao backend.");

      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setMessages(data);
      } else {
        setError("Nenhuma mensagem disponível.");
      }
    } catch (err) {
      setError("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="admin-container" style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Área Administrativa</h2>
      {!messages && (
        <form onSubmit={handleLogin} className="login-form" style={{ marginTop: "1rem" }}>
          <input
            type="password"
            placeholder="Senha administrativa"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: "0.5rem", marginRight: "0.5rem" }}
          />
          <button type="submit" style={{ padding: "0.5rem 1rem", cursor: "pointer" }}>
            Entrar
          </button>
        </form>
      )}

      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}

      {messages && (
        <div style={{ marginTop: "2rem", textAlign: "left" }}>
          <h3>📩 Mensagens recebidas:</h3>
          <ul>
            {messages.map((msg) => (
              <li key={msg.id} style={{ borderBottom: "1px solid #ccc", marginBottom: "1rem" }}>
                <p><b>Nome:</b> {msg.name}</p>
                <p><b>Email:</b> {msg.email}</p>
                <p><b>Mensagem:</b> {msg.message}</p>
                <p><small>{new Date(msg.date).toLocaleString()}</small></p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
