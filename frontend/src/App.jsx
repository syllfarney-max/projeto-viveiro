import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ContactForm from "./components/ContactForm";
import AdminLogin from "./components/AdminLogin";

export default function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Formulário</Link> | <Link to="/admin">Área Admin</Link>
      </nav>

      <Routes>
        <Route path="/" element={<ContactForm />} />
        <Route path="/admin" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
}
