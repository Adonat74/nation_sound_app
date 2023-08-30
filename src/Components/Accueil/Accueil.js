import React from "react" 
import { Link } from "react-router-dom"
import "./Accueil.css"

export default function Accueil () {

    const [artistesDataAccueil, setArtistesDataAccueil] = React.useState([]);

    React.useEffect(() => {
       
        fetch(`http://drupal10/jsonapi/node/artistes?sort=field_jour`)
            .then(res => res.json())
            .then(data => setArtistesDataAccueil(data.data))
    }, []);

    console.log(artistesDataAccueil);


    const artistesAccueil = artistesDataAccueil.map(data => {
        return (
            <div className="artistContainerAccueil">
                <Link to={`/page-artiste/${data.attributes.title}`}>
                    <img className="miniature" src={`http://drupal10/sites/default/files/2023-08/${data.attributes.title}.jpg`} alt="Artiste"></img>
                    <div className="infoMiniature">
                        <h2>{data.attributes.title}</h2>
                        <p>Jour {data.attributes.field_jour} - {data.attributes.field_heure}H</p>
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
            
            
            

        </div>
    );
}