import React from "react";
import Header from "./components/Header";
import ContactForm from "./components/ContactForm";
import "./styles.css";

const App = () => {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <ContactForm />
      </main>
    </div>
  );
};

export default App;
