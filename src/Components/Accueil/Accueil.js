import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { drupalAPI } from '../../api/axios';
import "./Accueil.css";

export default function Accueil () {

    const [artistesDataAccueil, setArtistesDataAccueil] = useState([]);

    useEffect(() => {
        drupalAPI.get(`/artistes`)
            .then(res => setArtistesDataAccueil(res?.data?.data));
    }, []);
 

    const artistesAccueil = artistesDataAccueil.map(data => {

        let title = data.attributes.title;

        return (
            <div className="artistContainerAccueil" key={data.id}>
                <Link to={`/page-artiste/${title}`}>
                    <img className="miniature" src={`${data.attributes.field_photo.uri}`} alt={`${title}`}></img>
                    <div className="infoMiniature">
                        <h2>{title}</h2>
                        <p>Jour {data.attributes.field_day} - {data.attributes.field_heure}H</p>
                        <p>Scène {data.attributes.field_scene}</p>
                    </div>
                </Link>
            </div>
        );
    });




    return(
        <div className="accueil">
            <h1>Accueil</h1>
            <div>
            <Link to="/checkout"><button className="billetterieButton">Billetterie<img src="/images/icons/arrow-right.svg" alt="flèche à droite"></img></button></Link>
            </div>
            <h2>Liste de tous les concerts</h2>

            <div className="miniatureGridAccueil">
                {artistesAccueil}
            </div>
            <Link to="/programmation"><button className="billetterieButton">Programmation<img src="/images/icons/arrow-right.svg" alt="flèche à droite"></img></button></Link>
            <Link to="/carte">
                <div className="minimapContainer">
                    <img className="minimap" src="/images/minimap.png" alt="Miniature de la carte"></img>
                    <button className="mapButton">Carte<img src="/images/icons/arrow-right.svg" alt="flèche à droite"></img></button>
                </div>
            </Link>
        </div>
    )
}