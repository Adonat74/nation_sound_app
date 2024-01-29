import React from "react" 
import { Link } from "react-router-dom"
import "./Header.css"

export default function Header (props) {

    return(
            <div className="header">
                <Link to="/"><img className="logo" src="/images/logo.png" alt="Logo Nation Sound"></img></Link>
                <div className="menu">
                    <Link to="/" className="elementsMenu">Accueil</Link>
                    <Link to="/programmation" className="elementsMenu">Programmation</Link>
                    <Link to="/carte" className="elementsMenu">Carte</Link>
                    <Link to="/informations" className="elementsMenu">Informations</Link>
                    <Link to="/partenaires" className="elementsMenu">Partenaires</Link>
                    <Link to="/FAQ" className="elementsMenu">FAQ</Link>
                </div>
                <button className="burger" onClick={() => props.toggleMenu()}><img className="burgerLogo" src="/images/icons/bars-solid-choco-pap.svg" alt="Menu déroulant logo"></img></button>
            </div>
    );
}