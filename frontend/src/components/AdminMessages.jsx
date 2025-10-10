import { useEffect, useState } from "react";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/messages`);
      const data = await res.json();
      if (data.success) setMessages(data.messages);
      else setError("Nenhuma mensagem encontrada.");
    } catch (err) {
      console.error(err);
      setError("Erro ao conectar com o backend.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  if (loading) return <p className="text-center mt-10">Carregando mensagens...</p>;
  if (error) return <p className="text-center text-red-600 mt-10">{error}</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-green-700 mb-4">Mensagens Recebidas</h2>
      <button
        onClick={fetchMessages}
        className="bg-green-600 text-white px-4 py-2 rounded-md mb-4 hover:bg-green-700"
      >
        Atualizar
      </button>
      {messages.length === 0 ? (
        <p>Nenhuma mensagem disponível.</p>
      ) : (
        <table className="w-full border border-green-300">
          <thead>
            <tr className="bg-green-100 text-left">
              <th className="p-2 border">Data</th>
              <th className="p-2 border">Nome</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Mensagem</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <tr key={msg.id} className="hover:bg-green-50">
                <td className="p-2 border">{new Date(msg.created_at).toLocaleString("pt-BR")}</td>
                <td className="p-2 border">{msg.name}</td>
                <td className="p-2 border">{msg.email}</td>
                <td className="p-2 border whitespace-pre-wrap">{msg.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
