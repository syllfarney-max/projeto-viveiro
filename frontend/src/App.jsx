import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ContactForm from "./components/ContactForm";
import Admin from "./pages/Admin";
import Header from "./components/Header";

export default function App() {
  return (
    <Router>
      <Header />
      <main className="container mx-auto p-6 text-center">
        <section className="hero my-10">
          <h2 className="text-2xl font-bold text-green-700">Produção de mudas e soluções ambientais</h2>
          <p>Mudas para paisagismo, recuperação ambiental e projetos de reflorestamento.</p>
        </section>

        <section className="contact my-10">
          <h3 className="text-xl mb-3">Fale conosco</h3>
          <ContactForm />
        </section>

        <Link
          to="/admin"
          className="inline-block bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
        >
          Área Administrativa
        </Link>
      </main>

      <Routes>
        <Route path="/admin" element={<Admin />} />
      </Routes>

      <footer className="text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} Viveiros ® Comurg — contato:{" "}
        <a href="mailto:syllfarney@hotmail.com">syllfarney@hotmail.com</a>
      </footer>
    </Router>
  );
}
