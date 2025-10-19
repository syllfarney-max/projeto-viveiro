import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ContactForm from "./components/ContactForm";
import AdminLogin from "./pages/AdminLogin";

export default function App() {
  return (
    <Router>
      <Header />

      <main className="main-container">
        <Routes>
          <Route
            path="/"
            element={
              <div className="home">
                <section id="sobre">
                  <h2>🌱 Sobre o Viveiro COMURG</h2>
                  <p>
                    O Viveiro COMURG é responsável pela produção e distribuição de mudas,
                    contribuindo para o reflorestamento urbano e a preservação ambiental.
                  </p>
                </section>

                <section id="contato">
                  <h2>📬 Entre em Contato</h2>
                  <ContactForm />
                </section>
              </div>
            }
          />

          <Route path="/admin" element={<AdminLogin />} />
        </Routes>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Viveiro COMURG — Todos os direitos reservados.</p>
      </footer>
    </Router>
  );
}
