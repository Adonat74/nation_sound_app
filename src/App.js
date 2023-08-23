import Header from "./Components/Header-Footer/Header/Header";
import MenuDeroulant from "./Components/Header-Footer/Header/MenuDeroulant";
import Accueil from "./Components/Accueil/Accueil";
import Informations from "./Components/Info_FAQ/Informations";
import FAQ from "./Components/Info_FAQ/FAQ";
import Footer from "./Components/Header-Footer/Footer/Footer";
import './App.css';
import React from 'react';
import { Routes, Route } from "react-router-dom";

export default function App() {

  const [menuToggle, setMenuToggle] = React.useState(false);

  function toggleMenu () {
    setMenuToggle(prevState => !prevState);
  }

  return (
    <div className="App">

      <Header toggleMenu={toggleMenu} />
              
      {menuToggle ? <MenuDeroulant /> : null}

      <Routes>
        {menuToggle ? null : <Route path="/" element={<Accueil />} />}
        {menuToggle ? null : <Route path="/informations" element={<Informations />} />}
        {menuToggle ? null : <Route path="/FAQ" element={<FAQ />} />}
      
        
      </Routes>



      {menuToggle ? null : <Footer />}
      
    </div>
  );
}


