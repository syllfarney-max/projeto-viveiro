// frontend/src/components/AdminPanel.jsx
import React from "react";

export default function AdminPanel({ messages }) {
  if (!messages || messages.length === 0) return <p>Nenhuma mensagem disponível.</p>;
  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {messages.map((m, i) => (
        <li key={i} style={{ border: '1px solid #ddd', padding: 12, marginBottom: 8 }}>
          <strong>{m.name}</strong> — <em>{m.email}</em>
          <p>{m.message}</p>
          <small>{m.date}</small>
        </li>
      ))}
    </ul>
  );
}
