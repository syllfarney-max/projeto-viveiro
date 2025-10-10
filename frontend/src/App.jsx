import React from 'react'
import ContactForm from './components/ContactForm'
export default function App(){
  return (
    <div className="page">
      <header className="text-center mt-4">
  <img
    src="/comurg.jpg"
    alt="Logo Comurg"
    className="mx-auto mb-2 w-16 h-16 object-contain"
  />
  <h1 className="text-4xl font-bold text-green-700">Viveiros ® Comurg</h1>
  <p className="text-green-600 mt-2">
    Mudas para paisagismo, recuperação ambiental e projetos de reflorestamento.
  </p>
</header>
        <section className="contact">
          <h3>Fale conosco</h3>
          <ContactForm />
        </section>
      </main>
      <footer className="site-footer">
        © {new Date().getFullYear()} Viveiros ® Comurg — contato: <a href="mailto:syllfarney@hotmail.com">syllfarney@hotmail.com</a>
      </footer>
    </div>
  )
}
