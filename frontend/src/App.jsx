import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ContactForm from "./components/ContactForm";
import AdminLogin from "./components/AdminLogin";
import AdminPanel from "./components/AdminPanel";

export default function App() {
  return (
    <Router>
      <header className="site-header">
        <img src="/comurg.jpg" alt="Comurg logo" className="logo" />
        <h1>Viveiros ® Comurg</h1>
        <p className="tagline">Sustentabilidade e Meio Ambiente</p>

        <nav className="flex gap-4">
          <Link to="/">Início</Link>
          <Link to="/admin">Área Administrativa</Link>
        </nav>
      </header>

      <main className="container">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <section className="hero">
                  <h2>Produção de mudas e soluções ambientais</h2>
                  <p>
                    Mudas para paisagismo, recuperação ambiental e projetos de
                    reflorestamento.
                  </p>
                </section>
                <section className="contact">
                  <h3>Fale conosco</h3>
                  <ContactForm />
                </section>
              </>
            }
          />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/panel" element={<AdminPanel />} />
        </Routes>
      </main>

      <footer className="site-footer">
        © {new Date().getFullYear()} Viveiros ® Comurg — contato:{" "}
        <a href="mailto:syllfarney@hotmail.com">syllfarney@hotmail.com</a>
      </footer>
    </Router>
  );
}
