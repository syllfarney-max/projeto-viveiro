import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ContactForm from "./components/ContactForm";
import AdminLogin from "./pages/AdminLogin";
import "./styles.css";

export default function App() {
  return (
    <Router>
      <div className="page">
        <header className="site-header">
          <img src="/comurg.jpg" alt="Logo Viveiro Comurg" className="logo" />
          <h1>Logo Viveiro Comurg</h1>
          <p className="tagline">Viveiro Comurg</p>

          <div className="button-container">
            <a
              href="https://wa.me/5562999569870"
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-button"
            >
              WhatsApp
            </a>
            <Link to="/admin" className="admin-button">
              Área Administrativa
            </Link>
          </div>
        </header>

        <main className="container">
          <section className="contact">
            <h3>Formulário de Contato</h3>
            <ContactForm />
          </section>
        </main>

        <footer className="site-footer">
          © {new Date().getFullYear()} Viveiros ® Comurg — contato:{" "}
          <a href="mailto:syllfarney@hotmail.com">syllfarney@hotmail.com</a>
        </footer>

        <Routes>
          <Route path="/admin" element={<AdminLogin />} />
        </Routes>
      </div>
    </Router>
  );
}
