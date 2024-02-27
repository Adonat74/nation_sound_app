import Header from "./Components/Header-Footer/Header/Header";
import MenuDeroulant from "./Components/Header-Footer/Header/MenuDeroulant";
import Accueil from "./Components/Accueil/Accueil";
import Programmation from "./Components/Programmation/Programmation";
import Carte from "./Components/Carte/Carte";
import MonCompte from "./Components/MonCompte/MonCompte"
import CreerMonCompte from "./Components/MonCompte/CreerMonCompte/CreerMonCompte";
import Connexion from "./Components/MonCompte/Connexion/Connexion"
import ModifierMonCompte from "./Components/MonCompte/ModifierMonCompte/ModifierMonCompte";
import Informations from "./Components/Info_FAQ/Informations";
import Partenaires from "./Components/Partenaires/Partenaires";
import PageArtiste from "./Components/PageArtiste/PageArtiste";
import FAQ from "./Components/Info_FAQ/FAQ";
import Footer from "./Components/Header-Footer/Footer/Footer";
import Missing from './Components/Missing/Missing'
import './App.css';
import { useState } from 'react';
import RequireAuth from './Components/RequireAuth';
import { Routes, Route, useLocation } from "react-router-dom";
import Checkout from "./Components/Paypal/Checkout";

import { HelmetProvider } from 'react-helmet-async';





export default function App() {

  const [menuToggle, setMenuToggle] = useState(false);

  function toggleMenu () {
    setMenuToggle(prevState => !prevState);
  }
  

  let location = useLocation();


  // cache le menu burger si l'écran fait plus de 1024 pixels
  window.addEventListener("resize", () => {
    if (window.screen.width >= 1024) {
      setMenuToggle(false);
    }
  });

  


  return (
    <main className="App">
      
      {/* permet d'éviter le problème rencontré avec le strict mode de react et helmet */}
      <HelmetProvider>

        <Header toggleMenu={toggleMenu} setMenuToggle={setMenuToggle} />
                
        {menuToggle ? <MenuDeroulant toggleMenu={toggleMenu} /> : null}

        
        <Routes>
            {menuToggle ? null : <Route path="/" element={<Accueil />} />}
            {menuToggle ? null : <Route path="/programmation" element={<Programmation />} />}
            {menuToggle ? null : <Route path="/carte" element={<Carte />} />}
            {menuToggle ? null : <Route path="/mon-compte/creer" element={<CreerMonCompte />} />}
            {menuToggle ? null : <Route path="/mon-compte/connexion" element={<Connexion />} />}
            
            {menuToggle ? null : <Route path="/informations" element={<Informations />} />}
            {menuToggle ? null : <Route path="/partenaires" element={<Partenaires />} />}
            {menuToggle ? null : <Route path="/foire-aux-quetions" element={<FAQ />} />}
            {menuToggle ? null : <Route path="/page-artiste/:artistTitle" element={<PageArtiste />} />}

            {/* Les routes à sécuriser */}
            <Route element={<RequireAuth />}>
              {menuToggle ? null : <Route path="/mon-compte/modifier" element={<ModifierMonCompte />} />}
              {menuToggle ? null : <Route path="/mon-compte" element={<MonCompte />} />}
              {menuToggle ? null : <Route path="/paiement" element={<Checkout />} />}
            </Route>

            {/* Si l'url n'existe pas */}
            {menuToggle ? null : <Route path="*" element={<Missing />} />}

        </Routes>
        
        {/* permet le bon maintient du footer en bas de page */}
        <div className={menuToggle || location.pathname === "/carte" ? null : "space"}></div>

        {menuToggle || location.pathname === "/carte" ? null : <Footer />}

      </HelmetProvider>
    </main>
  );
}


