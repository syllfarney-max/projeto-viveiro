import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ContactForm from "./components/ContactForm";
import React from "react";

const getBackendBase = () => {
  const fromEnv = import.meta.env.VITE_API_URL;
  if (fromEnv && fromEnv.trim() !== "") return fromEnv.replace(/\/+$/, "");
  return "https://viveiro-comurg-backend-yjsj.onrender.com".replace(/\/+$/, "");
};

function AdminPage() {
  const [msgs, setMsgs] = React.useState(null);
  const backend = getBackendBase();

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch(`${backend}/messages`);
        const j = await res.json();
        if (!mounted) return;
        if (j && j.success && Array.isArray(j.messages)) setMsgs(j.messages);
        else setMsgs([]);
      } catch (err) {
        console.error("[AdminPage] erro ao buscar /messages:", err);
        if (mounted) setMsgs(null);
      }
    })();
    return () => (mounted = false);
  }, []);

  return (
    <div style={{maxWidth:900, margin:'20px auto', padding:16}}>
      <h2>Área Administrativa</h2>
      <p>Lista de mensagens enviadas pelo formulário</p>

      {msgs === null && <p>Erro ao conectar com backend ou nenhum dado disponível.</p>}
      {Array.isArray(msgs) && msgs.length === 0 && <p>Nenhuma mensagem recebida.</p>}
      {Array.isArray(msgs) && msgs.map((m, i) => (
        <div key={i} style={{border:'1px solid #ddd', padding:10, marginBottom:10, textAlign:'left'}}>
          <strong>{m.name} &lt;{m.email}&gt;</strong>
          <div style={{fontSize:12, color:'#666'}}>{new Date(m.date).toLocaleString()}</div>
          <p>{m.message}</p>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <header className="site-header" style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column', padding:20}}>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <img src="/comurg.jpg" alt="Logo Comurg" className="logo" style={{width:64}} />
          <div style={{textAlign:'left'}}>
            <div style={{fontSize:18, fontWeight:700}}>Viveiros ® Comurg</div>
            <div style={{fontSize:12}}>Sustentabilidade e Meio Ambiente</div>
          </div>
        </div>
        <div style={{marginTop:10}}>
          <a href="https://wa.me/5562999569870?text=Olá!%20Quero%20mais%20informações%20sobre%20o%20Viveiro%20Comurg." target="_blank" rel="noreferrer" className="btn-whatsapp" style={{marginRight:8}}>WhatsApp</a>
          <Link to="/admin" className="btn-login">Área Administrativa</Link>
        </div>
      </header>

      <main style={{padding:20, maxWidth:900, margin:'0 auto'}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>

      <footer style={{textAlign:'center', padding:20}}>
        © {new Date().getFullYear()} Viveiros ® Comurg — contato: <a href="mailto:syllfarney@hotmail.com">syllfarney@hotmail.com</a>
      </footer>
    </Router>
  );
}

function Home(){
  return (
    <div style={{maxWidth:900, margin:'0 auto'}}>
      <h2>Produção de mudas e soluções ambientais</h2>
      <p>Mudas para paisagismo, recuperação ambiental e projetos de reflorestamento.</p>
      <section style={{marginTop:20}}>
        <h3>Fale conosco</h3>
        <ContactForm />
      </section>
    </div>
  );
}

