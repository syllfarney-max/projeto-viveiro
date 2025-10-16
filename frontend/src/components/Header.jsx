import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 25px",
        backgroundColor: "#1f5c39",
        color: "white",
        flexWrap: "wrap",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img
          src="/comurg.jpg"
          alt="logo"
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            backgroundColor: "white",
            padding: "4px",
          }}
        />
        <div>
          <h1 style={{ margin: 0, fontSize: "20px", fontWeight: "bold" }}>
            Viveiros ® Comurg
          </h1>
          <p style={{ margin: 0, opacity: 0.8, fontSize: "14px" }}>
            Sustentabilidade e Meio Ambiente
          </p>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
          marginTop: "10px",
          flexWrap: "wrap",
        }}
      >
        <a
          href="https://wa.me/5562999569870?text=Olá!%20Gostaria%20de%20mais%20informações%20sobre%20o%20Viveiro%20Comurg."
          target="_blank"
          rel="noreferrer"
          style={{
            backgroundColor: "#2f7a4a",
            color: "white",
            padding: "10px 20px",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "bold",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#3ea35e")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#2f7a4a")}
        >
          WhatsApp
        </a>

        <Link
          to="/admin"
          style={{
            backgroundColor: "#14432a",
            color: "white",
            padding: "10px 20px",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "bold",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0d2e1c")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#14432a")}
        >
          Área Administrativa
        </Link>
      </div>
    </header>
  );
}
