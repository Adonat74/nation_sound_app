import React from "react" 
import { Link } from "react-router-dom"
import "./Header.css"

export default function Header (props) {

    return(
        <div>
            <div className="header">
                <Link to="/"><img className="logo" src="/images/logo.png" alt="Logo Nation Sound"></img></Link>
                <div className="menu">
                </div>
                <button className="burger" onClick={() => props.toggleMenu()}><img className="burgerLogo" src="/images/icons/bars-solid-choco-pap.svg" alt="Menu déroulant logo"></img></button>
            </div>

        </div>
    );
}