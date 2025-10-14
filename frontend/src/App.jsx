import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContactForm from "./components/ContactForm";
import Admin from "./pages/Admin";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="page">
              <header className="site-header">
                <img src="/comurg.jpg" alt="Comurg logo" className="logo" />
                <h1>Viveiros ® Comurg</h1>
                <p className="tagline">Sustentabilidade e Meio Ambiente</p>
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

                <div className="mt-4 flex justify-center gap-3">
                  <a
                    href="https://wa.me/5562999569870?text=Olá%20Quero%20mais%20informações"
                    target="_blank"
                    rel="noreferrer"
                    className="bg-green-700 text-white px-3 py-2 rounded"
                  >
                    WhatsApp
                  </a>
                  <a href="/admin" className="bg-white text-green-800 px-3 py-2 rounded border">
                    Área Administrativa
                  </a>
                </div>
              </main>

              <footer className="site-footer">
                © {new Date().getFullYear()} Viveiros ® Comurg — contato:{" "}
                <a href="mailto:syllfarney@hotmail.com">syllfarney@hotmail.com</a>
              </footer>
            </div>
          }
        />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}