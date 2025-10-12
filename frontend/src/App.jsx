import React from "react";
import ContactForm from "./components/ContactForm";
import logo from "/comurg.jpg"; // <-- Importa o logo de forma segura (funciona no Vite e no Render)

export default function App() {
  return (
    <div className="page text-center">
      <header className="site-header">
        {/* Logo da Comurg acima do título */}
        <img
          src={logo}
          alt="Logo Comurg"
          className="mx-auto mb-2 w-16 h-auto opacity-90"
        />
        <h1>Viveiros ® Comurg</h1>
        <p className="tagline">Sustentabilidade e Meio Ambiente</p>
      </header>

      <main className="container mx-auto p-4">
        <section className="hero">
          <h2>Produção de mudas e soluções ambientais</h2>
          <p>
            Mudas para paisagismo, recuperação ambiental e projetos de
            reflorestamento.
          </p>
        </section>

        <section className="contact mt-6">
          <h3>Fale conosco</h3>
          <ContactForm />
        </section>
      </main>

      <footer className="site-footer mt-6 text-sm">
        © {new Date().getFullYear()} Viveiros ® Comurg — contato:{" "}
        <a
          href="mailto:syllfarney@hotmail.com"
          className="text-green-700 hover:underline"
        >
          syllfarney@hotmail.com
        </a>
      </footer>
    </div>
  );
}
