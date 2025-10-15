import React from "react";

export default function Header() {
  return (
    <header className="site-header">
      <img src="/comurg.jpg" alt="Comurg logo" className="logo" onError={(e)=>e.target.style.display='none'} />
      <h1 style={{ margin: 0 }}>Viveiros ® Comurg</h1>
      <p style={{ margin: '6px 0 0' }}>Sustentabilidade e Meio Ambiente</p>

      <div className="actions" style={{ marginTop: 10 }}>
        <a className="whatsapp-btn" href="https://wa.me/5562999569870" target="_blank" rel="noreferrer">WhatsApp</a>
        <a className="admin-btn" href="/admin">Área Administrativa</a>
      </div>
    </header>
  );
}
