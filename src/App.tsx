import React from "react";
import Home from "@/pages/Home";
import Footer  from "./components/Footer";

// Configuración básica de la App
const App: React.FC = () => {
  return (
    <div className="font-sans">
      <Home />
      <Footer />
    </div>
  );
};

export default App;
