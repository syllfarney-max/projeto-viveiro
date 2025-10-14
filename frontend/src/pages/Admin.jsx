import { useState, useEffect } from "react";

export default function Admin() {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/messages`);
        if (!res.ok) throw new Error("Erro ao conectar com o backend");
        const data = await res.json();
        setMessages(data);
      } catch {
        setError("Erro ao conectar com o servidor ou nenhum dado disponível.");
      }
    };
    fetchMessages();
  }, []);

  return (
    <div className="p-4 bg-green-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-green-800">📬 Mensagens Recebidas</h1>
      {error && <p className="text-red-600">{error}</p>}
      {!error && messages.length === 0 && <p>Nenhuma mensagem disponível.</p>}
      {messages.length > 0 && (
        <table className="w-full bg-white border rounded shadow-md">
          <thead>
            <tr className="bg-green-700 text-white">
              <th className="p-2">Nome</th>
              <th className="p-2">Email</th>
              <th className="p-2">Mensagem</th>
              <th className="p-2">Data</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((m, i) => (
              <tr key={i} className="border-t">
                <td className="p-2">{m.name}</td>
                <td className="p-2">{m.email}</td>
                <td className="p-2">{m.message}</td>
                <td className="p-2 text-sm text-gray-600">{new Date(m.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}