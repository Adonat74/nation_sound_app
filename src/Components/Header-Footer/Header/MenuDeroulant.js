import React from "react"
import { Link } from "react-router-dom"
import "./Header.css"

export default function MenuDeroulant (props) {


    return (
        <div className="menuDeroulant" onClick={() => props.toggleMenu()}>
                <Link to="/" className="elementsDeroulant">Accueil</Link>
                <p className="elementsDeroulant">Programmation</p>
                <p className="elementsDeroulant">Carte</p>
                <Link to="/informations" className="elementsDeroulant">Informations</Link>
                <p className="elementsDeroulant">Partenaires</p>
                <Link to="/FAQ" className="elementsDeroulant">FAQ</Link>
                
        </div>
    );
}