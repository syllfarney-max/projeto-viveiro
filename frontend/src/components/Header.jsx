// frontend/src/components/Header.jsx
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#f5f5f5",
        borderBottom: "2px solid #2e7d32",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img
          src="/comurg.jpg"
          alt="Comurg logo"
          style={{ width: "50px", height: "auto", borderRadius: "6px" }}
        />
        <div>
          <h1 style={{ margin: 0, color: "#2e7d32" }}>Viveiros ® Comurg</h1>
          <p style={{ margin: 0, fontSize: "0.9rem", color: "#333" }}>
            Sustentabilidade e Meio Ambiente
          </p>
        </div>
      </div>

      <div style={{ display: "flex", gap: "12px" }}>
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
            backgroundColor: "#1b5e20",
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
