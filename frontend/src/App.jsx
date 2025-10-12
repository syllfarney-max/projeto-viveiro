import React from "react";
import ContactForm from "./components/ContactForm";

export default function App() {
  // Caminho absoluto com fallback (funciona no Vite + Render)
  const logoPath = `${import.meta.env.BASE_URL || ""}comurg.jpg`;

  return (
    <div className="page text-center">
      <header className="site-header">
        {/* Logo da Comurg acima do título */}
        <img
          src={logoPath}
          alt="Logo Comurg"
          className="mx-auto mb-2 w-16 h-auto opacity-90"
          onError={(e) => {
            // Fallback caso o Render não resolva o caminho
            e.target.src = "/comurg.jpg";
          }}
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
