import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ContactForm from "./components/ContactForm";
import Admin from "./pages/Admin";

export default function App() {
  return (
    <Router>
      <div className="page">
        <header className="site-header text-center py-6 bg-green-700 text-white">
          <img src="/comurg.jpg" alt="Comurg logo" className="mx-auto mb-2 w-16 h-auto opacity-90" />
          <h1 className="text-2xl font-bold">Viveiros ® Comurg</h1>
          <p className="text-sm">Sustentabilidade e Meio Ambiente</p>
          <nav className="mt-3 space-x-4">
            <Link to="/" className="hover:underline">Início</Link>
            <Link to="/admin" className="hover:underline">Admin</Link>
          </nav>
        </header>

        <main className="container mx-auto p-4">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <section className="hero text-center mb-6">
                    <h2 className="text-xl font-semibold text-green-800">
                      Produção de mudas e soluções ambientais
                    </h2>
                    <p>Mudas para paisagismo, recuperação ambiental e projetos de reflorestamento.</p>
                  </section>
                  <section className="contact text-center">
                    <h3 className="text-lg font-semibold text-green-800 mb-2">Fale conosco</h3>
                    <ContactForm />
                  </section>
                </>
              }
            />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>

        <footer className="text-center py-4 bg-green-100 text-gray-700">
          © {new Date().getFullYear()} Viveiros ® Comurg — contato:{" "}
          <a href="mailto:syllfarney@hotmail.com" className="text-green-700 hover:underline">
            syllfarney@hotmail.com
          </a>
        </footer>
      </div>
    </Router>
  );
}
