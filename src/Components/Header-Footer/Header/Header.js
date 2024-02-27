import React from "react"; 
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header (props) {


    return(
            <header className="header">
                <Link to="/" onClick={() => props.setMenuToggle(false)}><img className="logo" src="/images/logo.png" alt="Logo Nation Sound" loading="lazy"></img></Link>
                <nav className="menu">
                    <Link to="/" className="elementsMenu">Accueil</Link>
                    <Link to="/programmation" className="elementsMenu">Programmation</Link>
                    <Link to="/carte" className="elementsMenu">Carte</Link>
                    <Link to="/mon-compte" className="elementsMenu">Mon Compte</Link>
                    <Link to="/informations" className="elementsMenu">Informations</Link>
                    <Link to="/partenaires" className="elementsMenu">Partenaires</Link>
                    <Link to="/foire-aux-quetions" className="elementsMenu">FAQ</Link>
                </nav>
                <button className="burger" onClick={() => props.toggleMenu()}><img className="burgerLogo" src="/images/icons/bars-solid-choco-pap.svg" alt="Menu déroulant logo" loading="lazy"></img></button>
            </header>
    );
}