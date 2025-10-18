import React from "react";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-green-800 text-white">
      <div className="flex items-center gap-3">
        <img src="/comurg.jpg" alt="logo" className="w-10 h-10 rounded" />
        <div>
          <h1 className="font-bold text-lg">Viveiros ® Comurg</h1>
          <small>Sustentabilidade e Meio Ambiente</small>
        </div>
      </div>

      {/* Botões separados */}
      <div className="flex items-center gap-4">
        <a
          href="https://wa.me/5562999569870?text=Olá%20Quero%20mais%20informações%20sobre%20o%20Viveiro%20Comurg"
          target="_blank"
          rel="noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition"
        >
          WhatsApp
        </a>

        <a
          href="/admin"
          className="bg-green-700 hover:bg-green-800 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition"
        >
          Área Administrativa
        </a>
      </div>
    </header>
  );
}
