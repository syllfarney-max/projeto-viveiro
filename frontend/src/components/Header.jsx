import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="site-header">
      <img src="/comurg.jpg" alt="Logo Comurg" className="logo" />
      <h1>Viveiros ® Comurg</h1>
      <p className="tagline">Sustentabilidade e Meio Ambiente</p>
      <div className="button-container">
        <a
          href="https://wa.me/5562999569870?text=Olá!%20Gostaria%20de%20mais%20informações%20sobre%20o%20Viveiro%20Comurg."
          target="_blank"
          rel="noreferrer"
          className="button-link whatsapp"
        >
          WhatsApp
        </a>
        <Link to="/admin" className="button-link admin">
          Área Administrativa
        </Link>
      </div>
    </header>
  );
}
