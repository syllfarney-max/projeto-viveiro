import { useEffect, useState } from "react";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/messages`)
      .then((res) => res.json())
      .then(setMessages)
      .catch(() => alert("Erro ao carregar mensagens."));
  }, []);

  return (
    <section className="admin">
      <h3>Mensagens Recebidas</h3>
      {messages.length === 0 ? (
        <p>Nenhuma mensagem recebida.</p>
      ) : (
        <ul>
          {messages.map((msg) => (
            <li key={msg.id}>
              <strong>{msg.name}</strong> ({msg.email})<br />
              <em>{new Date(msg.date).toLocaleString()}</em>
              <p>{msg.message}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
