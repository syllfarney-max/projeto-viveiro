import React, { useState } from 'react'
import ContactForm from './components/ContactForm'
import AdminMessages from './components/AdminMessages'

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    const user = e.target.user.value
    const pass = e.target.pass.value
    const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, pass })
    })
    const data = await res.json()
    if (data.success) setLoggedIn(true)
    else alert("Usuário ou senha incorretos!")
  }

  return (
    <div className="page">
      <header className="site-header">
        <img src="/comurg.jpg" alt="Logo Comurg" className="logo" />
        <h1>Viveiros ® Comurg</h1>
        <p className="tagline">Sustentabilidade e Meio Ambiente</p>
      </header>

      <main className="container">
        <section className="hero">
          <h2>Produção de mudas e soluções ambientais</h2>
          <p>Mudas para paisagismo, recuperação ambiental e projetos de reflorestamento.</p>
        </section>

        {isAdmin ? (
          loggedIn ? <AdminMessages /> : (
            <form onSubmit={handleLogin} className="login-form">
              <input type="text" name="user" placeholder="Usuário" required />
              <input type="password" name="pass" placeholder="Senha" required />
              <button type="submit">Entrar</button>
            </form>
          )
        ) : (
          <section className="contact">
            <h3>Fale conosco</h3>
            <ContactForm />
            <button onClick={() => setIsAdmin(true)} className="admin-btn">Área Administrativa</button>
          </section>
        )}
      </main>

      <footer className="site-footer">
        © {new Date().getFullYear()} Viveiros ® Comurg — contato: 
        <a href="mailto:syllfarney@hotmail.com">syllfarney@hotmail.com</a>
      </footer>
    </div>
  )
}
