import { useEffect, useState } from "react";
import { drupalAPI } from '../../api/axios';
import "./Info_FAQ.css";
import DOMPurify from 'dompurify';
import { Helmet } from 'react-helmet-async';

export default function Informations () {

    const [informationsData, setInformationsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    // Fetch des données des Informations depuis l'API Drupal de manière asynchrone
    useEffect(() => {
        async function getData () {
            try {
                await drupalAPI.get(`/informations`)
                    .then(res => setInformationsData(res?.data?.data));
            } catch (error) {
                setError(error); // En cas d'erreur, stocker l'erreur dans l'état correspondant
            } finally {
                setIsLoading(false); // Mettre à jour l'état isLoading une fois le chargement terminé
            }
        }
        getData();     
    }, []);


    const informations = informationsData.map(data => {

        // Sanitization des données
        const title = DOMPurify.sanitize(data.attributes.title);
        const information = DOMPurify.sanitize(data.attributes.field_description_information);

        return (
            <div className="information" key={data.id}>
                <h2>{title}</h2>
                <p>{information}</p>
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
                <title>Nation-Sound Festival - Informations</title>
                <meta name="title" content="Nation-Sound Festival - Informations" />
                <meta name="description" content="Tenez-vous informés des dernières nouvelles et informations concernant le festival." />
            </Helmet>
            {/* Affiche Loading... le temps que les artiste soient chargés */}
            {isLoading ? (
                <div className="loadingContainer">
                    <div className="loading">Loading…</div>
                </div>
            ) : (
                <div className="informations">
                    <h1>Informations</h1>
                    {informations}
                </div>
            )}
        </div>
    );
}