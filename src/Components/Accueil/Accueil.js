import React from "react";
import { Link } from "react-router-dom";
import "./Accueil.css";

export default function Accueil () {

    const [artistesDataAccueil, setArtistesDataAccueil] = React.useState([]);

    React.useEffect(() => {
       
        fetch(`http://localhost/drupal10/jsonapi/node/artistes`)
            .then(res => res.json())
            .then(data => setArtistesDataAccueil(data.data));
    }, []);
 
    console.log(artistesDataAccueil);

    const artistesAccueil = artistesDataAccueil.map(data => {

        let title = data.attributes.title;

        return (
            <div className="artistContainerAccueil">
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
                <button className="billetterieButton">Billetterie<img src="/images/icons/arrow-right.svg"></img></button>
            </div>
            <h2>Liste de tous les concerts</h2>

            <div className="miniatureGridAccueil">
                {artistesAccueil}
            </div>
            <Link to="/programmation"><button className="billetterieButton">Programmation<img src="/images/icons/arrow-right.svg"></img></button></Link>
            <Link to="/carte">
                <div className="minimapContainer">
                    <img className="minimap" src="/images/minimap.png" alt="Miniature de la carte"></img>
                    <button className="mapButton">Carte<img src="/images/icons/arrow-right.svg"></img></button>
                </div>
            </Link>
            
        </div>
    );
}