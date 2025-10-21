import React from "react";
import { useNavigate } from "react-router-dom";
// Se desejar usar imagem, coloque em frontend/public/comurg.jpg e use <img src="/comurg.jpg" ... />
export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="site-header">
      <div className="header-left">
        <img src="/comurg.jpg" alt="Logo Comurg" className="logo" />
        <div className="header-text">
          <h1>Viveiros ® Comurg</h1>
          <p className="tagline">Sustentabilidade e Meio Ambiente</p>
        </div>
      </div>

      <div className="header-right">
        <a
          className="button-link whatsapp"
          href="https://wa.me/5562999569870"
          target="_blank"
          rel="noreferrer"
        >
          WhatsApp
        </a>

        <button
          className="button-link admin"
          onClick={() => navigate("/admin")}
        >
          Área Administrativa
        </button>
      </div>
    </header>
  );
}

