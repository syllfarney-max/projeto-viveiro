import { useState, useEffect } from "react";

export default function Admin() {
  const [auth, setAuth] = useState(false);
  const [messages, setMessages] = useState([]);

  const login = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const result = await res.json();
    if (result.success) setAuth(true);
    else alert("Login inválido!");
  };

  useEffect(() => {
    if (auth) {
      fetch(`${import.meta.env.VITE_API_URL}/messages`)
        .then((res) => res.json())
        .then(setMessages)
        .catch(() => setMessages([]));
    }
  }, [auth]);

  if (!auth)
    return (
      <form onSubmit={login} className="max-w-sm mx-auto mt-10 space-y-3">
        <h2 className="text-xl font-bold text-center mb-4">Área Administrativa</h2>
        <input type="text" name="username" placeholder="Usuário" required className="border p-2 w-full" />
        <input type="password" name="password" placeholder="Senha" required className="border p-2 w-full" />
        <button className="bg-green-700 text-white px-4 py-2 rounded w-full">Entrar</button>
      </form>
    );

  return (
    <div className="max-w-2xl mx-auto my-8">
      <h2 className="text-xl font-bold mb-4">Mensagens Recebidas</h2>
      {messages.length === 0 ? (
        <p>Nenhuma mensagem disponível.</p>
      ) : (
        <ul className="space-y-3">
          {messages.map((m, i) => (
            <li key={i} className="border rounded p-3 text-left">
              <p><strong>Nome:</strong> {m.name}</p>
              <p><strong>Email:</strong> {m.email}</p>
              <p><strong>Mensagem:</strong> {m.message}</p>
              <p className="text-xs text-gray-500">{m.date}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
