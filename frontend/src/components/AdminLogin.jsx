import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "comurg2025") {
      localStorage.setItem("isAdmin", "true");
      navigate("/panel");
    } else {
      setError("Senha incorreta.");
    }
  };

  return (
    <div className="p-4 text-center">
      <h2 className="text-lg font-bold mb-4">Área Administrativa</h2>
      <form onSubmit={handleLogin} className="space-y-3">
        <input
          type="password"
          placeholder="Digite a senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full max-w-sm"
        />
        <button
          type="submit"
          className="bg-green-700 text-white px-4 py-2 rounded"
        >
          Entrar
        </button>
      </form>
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
}
