import React from "react";

export default function Header() {
  return (
    <header className="header">
      <nav className="navbar">
        <h1 className="logo">🌿 Viveiro COMURG</h1>
        <ul className="nav-links">
          <li><a href="/">Início</a></li>
          <li><a href="/#sobre">Sobre</a></li>
          <li><a href="/#contato">Contato</a></li>
          <li><a href="/admin">Área Administrativa</a></li>
        </ul>
      </nav>
    </header>
  );
}
