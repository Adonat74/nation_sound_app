import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { drupalAPI } from '../../api/axios';
import "./Accueil.css";
import DOMPurify from 'dompurify';
import { Helmet } from 'react-helmet-async';

export default function Accueil () {

    const [artistesDataAccueil, setArtistesDataAccueil] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // État pour indiquer si les données sont en cours de chargement
    const [error, setError] = useState(null); // État pour gérer les erreurs lors du chargement des données


    // Fetch des données des artistes depuis l'API Drupal de manière asynchrone
    useEffect(() => {
        async function getData () {
            try {
                await drupalAPI.get(`/artistes`)
                    .then(res => setArtistesDataAccueil(res?.data?.data));
            } catch (error) {
                setError(error); // En cas d'erreur, stocker l'erreur dans l'état correspondant
            } finally {
                setIsLoading(false); // Mettre à jour l'état isLoading une fois le chargement terminé
            }
        }
        getData();     
    }, []);

    // get data--------------
    // useEffect(() => {
    //     drupalAPI.get(`/artistes`)
    //         .then(res => setArtistesDataAccueil(res?.data?.data));
    // }, []);


    const artistesAccueil = artistesDataAccueil.map(data => {

        // Sanitization des données
        const title = DOMPurify.sanitize(data.attributes.title);
        const url = DOMPurify.sanitize(data.attributes.field_photo.uri);
        const day = DOMPurify.sanitize(data.attributes.field_day);
        const hour = DOMPurify.sanitize(data.attributes.field_heure);
        const scene = DOMPurify.sanitize(data.attributes.field_scene);

        return (
            <div className="artistContainerAccueil" key={data.id}>
                <Link to={`/page-artiste/${title}`}>
                    <img className="miniature" src={`${url}`} alt={`${title}`} loading="lazy"></img>
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
            {/* Permet de changer les title et description pour chaques composants */}
            <Helmet>
                <title>Nation-Sound Festival - Accueil</title>
                <meta name="title" content="Nation-Sound Festival - Accueil" />
                <meta name="description" content="Nation-Sound est un festival de musique qui ce déroule à Paris. Les artistes et les genres de musique seront variés, electro, jazz, pop, rap, rock, reggae." />
            </Helmet>
            
                <div className="accueil">
                    <h1>Accueil</h1>
                    <Link to="/paiement" className="billetterieButton">Billetterie<img src="/images/icons/arrow-right.svg" alt="flèche à droite" loading="lazy"></img></Link>
                    <h2>Liste de tous les concerts</h2>
                    {/* Affiche Loading... le temps que les artiste soient chargés */}
                    {isLoading ? (
                        <div className="loadingContainer">
                            <div className="loading">Loading…</div>
                        </div>
                    ) : (
                        <section className="miniatureGridAccueil">
                                {artistesAccueil} {/* Affichage de la liste des artistes */}
                        </section>
                    )}
                    <Link to="/programmation" className="billetterieButton">Programmation<img src="/images/icons/arrow-right.svg" alt="flèche à droite" loading="lazy"></img></Link>
                    <Link to="/carte">
                        <section className="minimapContainer">
                            <img className="minimap" src="/images/minimap.png" alt="Miniature de la carte" loading="lazy"></img>
                            <button className="mapButton">Carte<img src="/images/icons/arrow-right.svg" alt="flèche à droite" loading="lazy"></img></button>
                        </section>
                    </Link>
                </div>
        </div> 
    )
}