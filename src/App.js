import Header from "./Components/Header-Footer/Header/Header";
import MenuDeroulant from "./Components/Header-Footer/Header/MenuDeroulant";
import Accueil from "./Components/Accueil/Accueil";
import Programmation from "./Components/Programmation/Programmation";
import Carte from "./Components/Carte/Carte";
import ConnexionInscription from "./Components/ConnexionInscription/ConnexionInscription";
import Informations from "./Components/Info_FAQ/Informations";
import Partenaires from "./Components/Partenaires/Partenaires";
import PageArtiste from "./Components/PageArtiste/PageArtiste";
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


  window.addEventListener("resize", () => {
    if (window.screen.width >= 1024) {
      setMenuToggle(false);
    }
  });

  


  return (
    <div className="App">

      <Header toggleMenu={toggleMenu} />
              
      {menuToggle ? <MenuDeroulant toggleMenu={toggleMenu} /> : null}

      <Routes>
        {menuToggle ? null : <Route path="/" element={<Accueil />} />}
        {menuToggle ? null : <Route path="/programmation" element={<Programmation />} />}
        {menuToggle ? null : <Route path="/carte" element={<Carte />} />}
        {menuToggle ? null : <Route path="/connexion-inscription" element={<ConnexionInscription />} />}
        {menuToggle ? null : <Route path="/informations" element={<Informations />} />}
        {menuToggle ? null : <Route path="/partenaires" element={<Partenaires />} />}
        {menuToggle ? null : <Route path="/FAQ" element={<FAQ />} />}
        {menuToggle ? null : <Route path="/page-artiste/:artistTitle" element={<PageArtiste />} />}
      </Routes>

      <div className={menuToggle ? null : "space"}></div>

      {menuToggle ? null : <Footer />}
      
    </div>
  );
}


