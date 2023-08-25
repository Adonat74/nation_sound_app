import React from "react"
import { Link } from "react-router-dom"
import "./Header.css"

export default function MenuDeroulant (props) {


    return (
        <div className="menuDeroulant" onClick={() => props.toggleMenu()}>
                <Link to="/" className="elementsDeroulant">Accueil</Link>
                <Link to="/programmation" className="elementsDeroulant">Programmation</Link>
                <p className="elementsDeroulant">Carte</p>
                <Link to="/informations" className="elementsDeroulant">Informations</Link>
                <Link to="/partenaires" className="elementsDeroulant">Partenaires</Link>
                <Link to="/FAQ" className="elementsDeroulant">FAQ</Link>
                
        </div>
    );
}