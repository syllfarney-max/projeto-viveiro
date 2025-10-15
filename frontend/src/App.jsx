import React, { useState } from 'react';
import ContactForm from './components/ContactForm';
import AdminLogin from './components/AdminLogin';
import AdminPanel from './pages/AdminPanel';

export default function App() {
  const [admin, setAdmin] = useState(false);
  const [logged, setLogged] = useState(false);

  return (
    <div className="page">
      <header className="site-header">
        <img src="/comurg.jpg" alt="Comurg logo" className="logo" />
        <h1>Viveiros ® Comurg</h1>
        <p className="tagline">Sustentabilidade e Meio Ambiente</p>
        <div className="actions">
          <a
            href="https://wa.me/5562999569870?text=Olá%2C%20gostaria%20de%20informações!"
            target="_blank"
            rel="noreferrer"
            className="whatsapp-btn"
          >
            WhatsApp
          </a>
          <button onClick={() => setAdmin(true)} className="admin-btn">Área Administrativa</button>
        </div>
      </header>

      <main className="container">
        {admin ? (
          logged ? <AdminPanel /> : <AdminLogin onLogin={() => setLogged(true)} />
        ) : (
          <>
            <section className="hero">
              <h2>Produção de mudas e soluções ambientais</h2>
              <p>Mudas para paisagismo, recuperação ambiental e projetos de reflorestamento.</p>
            </section>
            <section className="contact">
              <h3>Fale conosco</h3>
              <ContactForm />
            </section>
          </>
        )}
      </main>

      <footer className="site-footer">
        © {new Date().getFullYear()} Viveiros ® Comurg — contato:
        <a href="mailto:syllfarney@hotmail.com">syllfarney@hotmail.com</a>
      </footer>
    </div>
  );
}

