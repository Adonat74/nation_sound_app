import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import "./Header.css";

export default function MenuDeroulant (props) {

    const { auth } = useAuth();

    return (
        <nav className="menuDeroulant" onClick={() => props.toggleMenu()}>
            <Link to="/" className="elementsDeroulant">Accueil</Link>
            <Link to="/programmation" className="elementsDeroulant">Programmation</Link>
            <Link to="/carte" className="elementsDeroulant">Carte</Link>
            <Link to={auth?.email ? "/mon-compte" : "/mon-compte/connexion"} className="elementsDeroulant">Mon Compte</Link>
            <Link to="/informations" className="elementsDeroulant">Informations</Link>
            <Link to="/partenaires" className="elementsDeroulant">Partenaires</Link>
            <Link to="/foire-aux-quetions" className="elementsDeroulant">FAQ</Link>
        </nav>
    );
}