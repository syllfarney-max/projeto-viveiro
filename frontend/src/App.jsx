import React from "react";
import ContactForm from "./components/ContactForm";

export default function App() {
  return (
    <div className="page">
      <header className="site-header">
        <img src="/comurg.jpg" alt="Logo Comurg" className="logo" />
        <h1>Viveiros ® Comurg</h1>
        <p className="tagline">Sustentabilidade e Meio Ambiente</p>

        <div className="top-buttons">
          <a href="https://wa.me/5562999999999?text=Olá!%20Quero%20mais%20informações%20sobre%20o%20Viveiro%20Comurg." target="_blank" rel="noreferrer" className="btn-whatsapp">WhatsApp</a>
          <a href="/admin" className="btn-login">Área Administrativa</a>
        </div>
      </header>

      <main className="container">
        <section className="hero">
          <h2>Produção de mudas e soluções ambientais</h2>
          <p>Mudas para paisagismo, recuperação ambiental e projetos de reflorestamento.</p>
        </section>

        <section className="contact">
          <h3>Fale conosco</h3>
          <ContactForm />
        </section>
      </main>

      <footer className="site-footer">
        © {new Date().getFullYear()} Viveiros ® Comurg — contato:
        <a href="mailto:syllfarney@hotmail.com"> syllfarney@hotmail.com</a>
      </footer>
    </div>
  );
}