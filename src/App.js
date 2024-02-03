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
import Layout from './Components/Layout';
import './App.css';
import React from 'react';
import RequireAuth from './Components/RequireAuth';
import { Routes, Route, useLocation } from "react-router-dom";
import PayPal from "./Paypal/PayPal";




export default function App() {

  const [menuToggle, setMenuToggle] = React.useState(false);

  let location = useLocation();

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
      

      <Header toggleMenu={toggleMenu} setMenuToggle={setMenuToggle} />
              
      {menuToggle ? <MenuDeroulant toggleMenu={toggleMenu} /> : null}

      
      <section className="mainContent">
        <Routes>
          <Route path="/" element={<Layout />}>
            {menuToggle ? null : <Route path="/" element={<Accueil />} />}
            {menuToggle ? null : <Route path="/programmation" element={<Programmation />} />}
            {menuToggle ? null : <Route path="/carte" element={<Carte />} />}
            {menuToggle ? null : <Route path="/mon-compte/creer" element={<CreerMonCompte />} />}
            {menuToggle ? null : <Route path="/mon-compte/connexion" element={<Connexion />} />}
            
            {menuToggle ? null : <Route path="/informations" element={<Informations />} />}
            {menuToggle ? null : <Route path="/partenaires" element={<Partenaires />} />}
            {menuToggle ? null : <Route path="/FAQ" element={<FAQ />} />}
            {menuToggle ? null : <Route path="/page-artiste/:artistTitle" element={<PageArtiste />} />}

            {/* we want to protect these routes */}
            <Route element={<RequireAuth />}>
              {menuToggle ? null : <Route path="/mon-compte/modifier" element={<ModifierMonCompte />} />}
              {menuToggle ? null : <Route path="/mon-compte" element={<MonCompte />} />}
              {menuToggle ? null : <Route path="/checkout" element={<PayPal />} />}
            </Route>

            {/* catch all */}
            {menuToggle ? null : <Route path="*" element={<Missing />} />}

          </Route>
        </Routes>
      </section>
      
      
      <div className={menuToggle || location.pathname === "/carte" ? null : "space"}></div>

      {menuToggle || location.pathname === "/carte" ? null : <Footer />}
      
    </div>
  );
}


