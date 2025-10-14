import { useEffect, useState } from "react";

export default function AdminPanel() {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      setError("Acesso negado. Faça login novamente.");
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/messages`)
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch(() =>
        setError("Erro ao conectar com o servidor ou nenhum dado disponível.")
      );
  }, []);

  if (error) return <p className="text-center text-red-600 mt-4">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Mensagens Recebidas</h2>
      {messages.length > 0 ? (
        <ul className="space-y-2">
          {messages.map((msg, i) => (
            <li key={i} className="border p-3 rounded bg-gray-100">
              <strong>{msg.name}</strong> ({msg.email})
              <p>{msg.message}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhuma mensagem encontrada.</p>
      )}
    </div>
  );
}
