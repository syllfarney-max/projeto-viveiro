import React from "react";
import ContactForm from "./components/ContactForm";
import AdminLogin from "./components/AdminLogin";
import AdminPanel from "./components/AdminPanel";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <header className="site-header">
        <img src="/comurg.jpg" alt="Comurg logo" className="logo" />
        <h1>Viveiros ® Comurg</h1>
        <p className="tagline">Sustentabilidade e Meio Ambiente</p>
        <nav className="nav">
          <Link to="/">Início</Link>
          <Link to="/admin">Área Administrativa</Link>
        </nav>
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/panel" element={<AdminPanel />} />
        </Routes>
      </main>
      <footer className="site-footer">
        © {new Date().getFullYear()} Viveiros ® Comurg — contato: <a href="mailto:syllfarney@hotmail.com">syllfarney@hotmail.com</a>
      </footer>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <section className="hero">
        <h2>Produção de mudas e soluções ambientais</h2>
        <p>Mudas para paisagismo, recuperação ambiental e projetos de reflorestamento.</p>
      </section>
      <section className="contact">
        <h3>Fale conosco</h3>
        <ContactForm />
        <div className="actions">
          <a href="https://wa.me/5562999569870?text=Olá,%20quero%20mais%20informações%20sobre%20o%20Viveiros%20Comurg." target="_blank" rel="noreferrer" className="btn">WhatsApp</a>
        </div>
      </section>
    </div>
  );
}
