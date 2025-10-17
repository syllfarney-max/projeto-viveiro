// frontend/src/components/Header.jsx
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header
      style={{
        backgroundColor: "#1b5e20", // verde escuro
        color: "white",
        padding: "20px 0",
        textAlign: "center",
      }}
    >
      {/* LOGO */}
      <img
        src="/comurg.jpg"
        alt="Comurg logo"
        style={{
          width: "90px",
          height: "auto",
          marginBottom: "10px",
        }}
      />

      {/* TÍTULO */}
      <h1 style={{ margin: "0", fontSize: "1.8rem", fontWeight: "bold" }}>
        Viveiros ® Comurg
      </h1>
      <p style={{ marginTop: "4px", fontSize: "1rem" }}>
        Sustentabilidade e Meio Ambiente
      </p>

      {/* BOTÕES */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "12px",
          marginTop: "10px",
        }}
      >
        <a
          href="https://wa.me/5562999569870?text=Olá,%20quero%20mais%20informações!"
          target="_blank"
          rel="noreferrer"
          style={{
            backgroundColor: "#4caf50",
            color: "white",
            padding: "8px 14px",
            borderRadius: "6px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          WhatsApp
        </a>

        <Link
          to="/admin"
          style={{
            backgroundColor: "#145a32",
            color: "white",
            padding: "8px 14px",
            borderRadius: "6px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Área Administrativa
        </Link>
      </div>
    </header>
  );
}
