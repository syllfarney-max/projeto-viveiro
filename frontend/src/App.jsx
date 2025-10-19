import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import ContactForm from "./components/ContactForm.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";

export default function App() {
  return (
    <>
      <Header />
      <main className="main-area">
        <Routes>
          <Route path="/" element={<ContactForm />} />
          <Route path="/admin" element={<AdminLogin />} />
        </Routes>
      </main>
    </>
  );
}

