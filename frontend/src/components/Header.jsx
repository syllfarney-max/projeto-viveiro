export default function Header() {
  return (
    <header className="site-header">
      <img src="/comurg.jpg" alt="Logo Comurg" className="logo" />
      <h1>Viveiros ® Comurg</h1>
      <p className="tagline">Sustentabilidade e Meio Ambiente</p>

      <div className="button-group">
        <a
          href="https://wa.me/5562999569870"
          target="_blank"
          rel="noreferrer"
          className="btn-whatsapp"
        >
          WhatsApp
        </a>

        <a href="#admin" className="btn-admin">
          Área Administrativa
        </a>
      </div>
    </header>
  );
}
