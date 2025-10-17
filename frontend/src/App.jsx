import React from "react";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <header className="site-header">
        <img
          src="/logo.png"
          alt="Logo Viveiro Comurg"
          className="logo"
        />
        <p className="tagline">Viveiro Comurg</p>

        <div className="button-container">
          <a
            href="https://wa.me/5562999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-button"
          >
            WhatsApp
          </a>
          <a
            href="/admin"
            className="admin-button"
          >
            Área Administrativa
          </a>
        </div>
      </header>

      <main className="main-content">
        <h2>Formulário de Contato</h2>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const data = {
              name: e.target.name.value,
              email: e.target.email.value,
              message: e.target.message.value,
            };
            try {
              const res = await fetch(
                "https://viveiro-comurg-backend-34cj.onrender.com/send",
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(data),
                }
              );
              if (res.ok) {
                alert("Mensagem enviada com sucesso!");
                e.target.reset();
              } else {
                alert("Erro ao enviar a mensagem.");
              }
            } catch (error) {
              alert("Erro ao conectar com o servidor.");
            }
          }}
        >
          <input
            type="text"
            name="name"
            placeholder="Seu nome"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Seu e-mail"
            required
          />
          <textarea
            name="message"
            placeholder="Sua mensagem"
            required
          />
          <button type="submit">Enviar Mensagem</button>
        </form>
      </main>
    </div>
  );
}

export default App;
