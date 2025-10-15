import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ContactForm from "./components/ContactForm";
import Header from "./components/Header";
import AdminLogin from "./pages/AdminLogin";

export default function App() {
  return (
    <Router>
      <div className="page">
        <header className="site-header">
          <img src="/comurg.jpg" alt="Logo Comurg" className="logo" />
          <h1>Viveiros ® Comurg</h1>
          <p className="tagline">Sustentabilidade e Meio Ambiente</p>

          <nav>
            <a href="https://wa.me/5562999569870" className="whatsapp-button" target="_blank">
              WhatsApp
            </a>
            <Link to="/admin" className="admin-button">Área Administrativa</Link>
          </nav>
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
          © {new Date().getFullYear()} Viveiros ® Comurg — contato:{" "}
          <a href="mailto:syllfarney@hotmail.com">syllfarney@hotmail.com</a>
        </footer>

        {/* Rotas da aplicação */}
        <Routes>
          <Route path="/admin" element={<AdminLogin />} />
        </Routes>
      </div>
    </Router>
  );
}

