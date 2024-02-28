import { useEffect, useState } from "react";
import { drupalAPI } from '../../api/axios';
import "./Info_FAQ.css";
import DOMPurify from 'dompurify';
import { Helmet } from 'react-helmet-async';


export default function FAQ () {

    const [FAQData, setFAQData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    // Fetch des données de la FAQ depuis l'API Drupal de manière asynchrone
    useEffect(() => {
        async function getData () {
            try {
                await drupalAPI.get(`/faq`)
                    .then(res => setFAQData(res?.data?.data));
            } catch (error) {
                setError(error); // En cas d'erreur, stocker l'erreur dans l'état correspondant
            } finally {
                setIsLoading(false); // Mettre à jour l'état isLoading une fois le chargement terminé
            }
        }
        getData();     
    }, []);


    const FAQ = FAQData.map(data => {

        // Sanitization des données
        const title = DOMPurify.sanitize(data.attributes.title);
        const response = DOMPurify.sanitize(data.attributes.field_reponse);

        return (
            <div className="question" key={data.id}>
                <h2>{title}</h2>
                <p>{response}</p>
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
                <title>Nation-Sound Festival - Foire Aux Questions</title>
                <meta name="title" content="Nation-Sound Festival - Foire Aux Questions" />
                <meta name="description" content="Trouvez la réponse aux questions les plus fréquement posées sur le déroulement du festival, le paiment et le fonctionnement du site." />
            </Helmet>
            {/* Affiche Loading... le temps que les artiste soient chargés */}
            {isLoading ? (
                <div className="loadingContainer">
                    <div className="loading">Loading…</div>
                </div>
            ) : (
                <div className="FAQ">
                    <h1>FAQ</h1>
                    {FAQ}
                </div>
            )}
        </div>
        
    );
}