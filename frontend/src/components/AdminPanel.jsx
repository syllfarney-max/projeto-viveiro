import { useEffect, useState } from "react";

export default function AdminPage() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/messages`)
      .then(res => res.json())
      .then(setMessages)
      .catch(() => setMessages([]));
  }, []);

  return (
    <div className="admin">
      <h2>Mensagens Recebidas</h2>
      {messages.length === 0 ? <p>Nenhuma mensagem disponível.</p> : (
        <ul>
          {messages.map((m, i) => (
            <li key={i}>
              <strong>{m.name}</strong> ({m.email}) — {new Date(m.date).toLocaleString()}
              <p>{m.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
