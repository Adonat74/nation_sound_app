import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { drupalAPI } from '../../api/axios';
import "./Accueil.css";
import DOMPurify from 'dompurify';
import { Helmet } from 'react-helmet-async';

export default function Accueil () {

    const [artistesDataAccueil, setArtistesDataAccueil] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    // get data asynchronously
    useEffect(() => {
        async function getData () {
            try {
                await drupalAPI.get(`/artistes`)
                    .then(res => setArtistesDataAccueil(res?.data?.data));
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        }
        getData();     
    }, []);
    
    // useEffect(() => {
    //     drupalAPI.get(`/artistes`)
    //         .then(res => setArtistesDataAccueil(res?.data?.data));
    // }, []);


    const artistesAccueil = artistesDataAccueil.map(data => {

        // sanitize data that is rendered in the html tags
        let title = DOMPurify.sanitize(data.attributes.title);
        let url = DOMPurify.sanitize(data.attributes.field_photo.uri);
        let day = DOMPurify.sanitize(data.attributes.field_day);
        let hour = DOMPurify.sanitize(data.attributes.field_heure);
        let scene = DOMPurify.sanitize(data.attributes.field_scene);

        return (
            <div className="artistContainerAccueil" key={data.id}>
                <Link to={`/page-artiste/${title}`}>
                    <img className="miniature" src={`${url}`} alt={`${title}`}></img>
                    <div className="infoMiniatureAccueil">
                        <h3>{title}</h3>
                        <p>Jour {day} - {hour}H</p>
                        <p>Scène {scene}</p>
                    </div>
                </Link>
            </div>
        );
    });

    // permet d'afficher une page d'erreur plutot que de faire crasher toute l'application lors du get
    if (error) {
        return <div>Error: {error.message}</div>;
    }


    return(
        <div>
            <Helmet>
                <title>Nation-Sound Festival - Accueil</title>
                <meta name="title" content="Nation-Sound Festival - Accueil" />
                <meta name="description" content="Nation-Sound est un festival de musique qui ce déroule à Paris. Les artistes et les genres de musique seront variés, electro, jazz, pop, rap, rock, reggae." />
            </Helmet>
            {/* Affiche Loading... le temps que les artiste soient chargés */}
            {isLoading ? (
                <div className="loadingContainer">
                    <div className="loading">Loading…</div>
                </div>
            ) : (
                <div className="accueil">
                    <h1>Accueil</h1>
                    <Link to="/paiement"><button className="billetterieButton">Billetterie<img src="/images/icons/arrow-right.svg" alt="flèche à droite"></img></button></Link>
                    
                    <h2>Liste de tous les concerts</h2>
                    <section className="miniatureGridAccueil">
                            {artistesAccueil}
                    </section>
                    <Link to="/programmation"><button className="billetterieButton">Programmation<img src="/images/icons/arrow-right.svg" alt="flèche à droite"></img></button></Link>
                    <Link to="/carte">
                        <section className="minimapContainer">
                            <img className="minimap" src="/images/minimap.png" alt="Miniature de la carte"></img>
                            <button className="mapButton">Carte<img src="/images/icons/arrow-right.svg" alt="flèche à droite"></img></button>
                        </section>
                    </Link>
                </div>
            )}
        </div> 
    )
}