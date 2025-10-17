import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ContactForm from './components/ContactForm';
import AdminPanel from './pages/AdminPanel';
import './styles.css';

export default function App() {
  return (
    <Router>
      <Header />
      <main className="container">
        <section className="hero">
          <h2>Produção de mudas e soluções ambientais</h2>
          <p>Mudas para paisagismo, recuperação ambiental e projetos de reflorestamento.</p>
        </section>
        <section className="contact">
          <h3>Fale conosco</h3>
          <ContactForm />
        </section>
      </main>
      <Routes>
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}
