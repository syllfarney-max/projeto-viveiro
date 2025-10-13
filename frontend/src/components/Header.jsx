export default function Header() {
  return (
    <header className="site-header">
      <img src="/comurg.jpg" alt="Logo Comurg" className="logo" />
      <h1>Viveiros ® Comurg</h1>
      <p className="tagline">Sustentabilidade e Meio Ambiente</p>
      <div className="top-buttons">
        <a
          href="https://wa.me/5562999569870?text=Olá!%20Quero%20mais%20informações%20sobre%20o%20Viveiro%20Comurg."
          target="_blank"
          rel="noreferrer"
          className="whatsapp-btn"
        >
          WhatsApp
        </a>
        <a href="/admin" className="admin-btn">Área Administrativa</a>
      </div>
    </header>
  );
}
