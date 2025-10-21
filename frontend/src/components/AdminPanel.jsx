import { useEffect, useState } from "react";

export default function AdminPanel() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/admin/messages`)
      .then((res) => res.json())
      .then(setMessages)
      .catch(() => setMessages([]));
  }, []);

  return (
    <div>
      <h2>Mensagens Recebidas</h2>
      {messages.length === 0 ? (
        <p>Nenhuma mensagem encontrada.</p>
      ) : (
        <ul>
          {messages.map((msg) => (
            <li key={msg.id}>
              <strong>{msg.name}</strong> ({msg.email}) — {msg.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
