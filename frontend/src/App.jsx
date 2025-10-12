import React from 'react'
import ContactForm from './components/ContactForm'

export default function App(){
  return (
    <div className="page">
      <header className="site-header">
        {/* Logo da Comurg acima do título */}
        <img
          src="/comurg.jpg"
          alt="Comurg logo"
          className="logo"
          style={{
            width: '60px',
            height: 'auto',
            margin: '0 auto 8px',
            display: 'block',
            opacity: 0.9
          }}
        />
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
      </main>

      <footer className="site-footer">
        © {new Date().getFullYear()} Viveiros ® Comurg — contato:{' '}
        <a href="mailto:syllfarney@hotmail.com">syllfarney@hotmail.com</a>
      </footer>
    </div>
  )
}
