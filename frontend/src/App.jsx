import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContactForm from "./components/ContactForm";
import Header from "./components/Header";
import AdminLogin from "./pages/AdminLogin"; // ✅ login primeiro

export default function App() {
  return (
    <Router>
      <div className="page">
        <Header />

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

        <Routes>
          <Route path="/admin" element={<AdminLogin />} />
        </Routes>
      </div>
    </Router>
  );
}


