import { useEffect, useState } from "react";

export default function AdminPanel() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch("https://viveiro-comurg-backend-yjsj.onrender.com/messages")
      .then((res) => res.json())
      .then(setMessages)
      .catch(() => setMessages([]));
  }, []);

  return (
    <div className="admin-panel">
      <h2>Mensagens Recebidas</h2>
      {messages.length === 0 ? (
        <p>Nenhum dado disponível.</p>
      ) : (
        <ul>
          {messages.map((msg) => (
            <li key={msg.id}>
              <strong>{msg.name}</strong> ({msg.email}): {msg.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
