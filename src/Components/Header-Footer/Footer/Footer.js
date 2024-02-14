import React from "react" 
import { Link } from "react-router-dom"
import "./Footer.css"

export default function Footer () {

    return(
        <footer className="footer">
            <Link to="/partenaires" className="partenairesButton">Partenaires<img src="/images/icons/arrow-right.svg" alt="flèche pointant vers la droite" loading="lazy"></img></Link>
            <div className="reseauxSociaux">
                <h4 className="followUs">Nos réseaux sociaux</h4>
                <div className="footerLogos">
                    <img src="/images/icons/square-facebook-choco-pap.svg" alt="Facebook" loading="lazy"></img>
                    <img src="/images/icons/instagram-choco-pap.svg" alt="Instagram" loading="lazy"></img>
                    <img src="/images/icons/square-twitter-choco-pap.svg" alt="Twitter" loading="lazy"></img>
                </div>
            </div>
        </footer>
    );
}