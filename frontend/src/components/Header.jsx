import React from "react";

export default function Header() {
  return (
    <header className="site-header">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <img
          src="./comurg.jpg"
          alt="Comurg logo"
          className="logo"
          style={{ width: 60, height: "auto", marginBottom: 8 }}
        />
        <h1>Viveiros ® Comurg</h1>
        <p>Sustentabilidade e Meio Ambiente</p>
      </div>
      <div className="actions" style={{ marginTop: 10 }}>
        <a
          className="whatsapp-btn"
          href="https://wa.me/5562999569870"
          target="_blank"
          rel="noreferrer"
        >
          WhatsApp
        </a>
        <a className="admin-btn" href="/admin">
          Área Administrativa
        </a>
      </div>
    </header>
  );
}
