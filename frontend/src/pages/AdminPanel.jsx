import { useEffect, useState } from "react";

export default function AdminPanel() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch("https://viveiro-comurg-backend-yjsj.onrender.com/messages")
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch(() => setMessages([]));
  }, []);

  return (
    <div className="admin-container">
      <h2>📬 Mensagens Recebidas</h2>
      {messages.length === 0 ? (
        <p>Nenhuma mensagem disponível.</p>
      ) : (
        <ul>
          {messages.map((msg, i) => (
            <li key={i}>
              <strong>{msg.name}</strong> ({msg.email})<br />
              {msg.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
