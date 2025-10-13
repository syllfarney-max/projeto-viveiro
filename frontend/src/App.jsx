import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ContactForm from "./components/ContactForm";

function AdminPage() {
  const [msgs, setMsgs] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/messages`);
        const j = await res.json();
        if (j.success) setMsgs(j.messages);
      } catch (e) {
        setMsgs(null);
      }
    })();
  }, []);

  return (
    <div style={{maxWidth:800, margin:'20px auto'}}>
      <h2>Área Administrativa</h2>
      <p>Página administrativa (lista de mensagens enviadas pelo formulário)</p>
      <div>
        {msgs === null && <p>Carregando ou nenhuma conexão com backend.</p>}
        {Array.isArray(msgs) && msgs.length === 0 && <p>Nenhuma mensagem recebida.</p>}
        {Array.isArray(msgs) && msgs.map((m, i) => (
          <div key={i} style={{border:'1px solid #ddd', padding:10, marginBottom:10, textAlign:'left'}}>
            <strong>{m.name} &lt;{m.email}&gt;</strong>
            <div style={{fontSize:12, color:'#666'}}>{new Date(m.date).toLocaleString()}</div>
            <p>{m.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <header className="site-header">
        <div style={{display:'flex',alignItems:'center',gap:12,justifyContent:'center'}}>
          <img src="/comurg.jpg" alt="Logo Comurg" className="logo" />
          <div style={{textAlign:'left'}}>
            <div style={{fontSize:18, fontWeight:700}}>Viveiros ® Comurg</div>
            <div style={{fontSize:12}}>Sustentabilidade e Meio Ambiente</div>
          </div>
        </div>
        <div style={{position:'absolute', right:20, top:20}}>
          <a href="https://wa.me/5562999569870?text=Olá!%20Quero%20mais%20informações%20sobre%20o%20Viveiro%20Comurg." target="_blank" rel="noreferrer" className="btn-whatsapp">WhatsApp</a>
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
