import { useEffect, useState } from "react";
import { drupalAPI } from '../../api/axios';
import "./Partenaires.css";
import DOMPurify from 'dompurify';
import { Helmet } from 'react-helmet-async';



export default function Partenaires () {

    const [partenairesData, setPartenairesData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    // get data asynchronously
    useEffect(() => {
        async function getData () {
            try {
                await drupalAPI.get(`/partners`)
                    .then(res => setPartenairesData(res?.data?.data));
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        }
        getData();     
    }, []);

    // useEffect(() => {
    //     drupalAPI.get(`/partners`)
    //         .then(res => setPartenairesData(res?.data?.data));
    // }, []);


    const partenaires = partenairesData.map(data => {

        let title = DOMPurify.sanitize(data.attributes.title);
        let url = DOMPurify.sanitize(data.attributes.field_partners_logo_url.uri);

        return (
            <div className="partenaire" key={data.id}>
                <img className="partenaire-logo" src={`${url}`} alt={`${title}`}></img>
                <p className="partenaire-title">{title}</p>
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
                <title>Nation-Sound Festival - Partenaires</title>
                <meta name="title" content="Nation-Sound Festival - Partenaires" />
                <meta name="description" content="Les partenaires du festival." />
            </Helmet>
            {/* Affiche Loading... le temps que les artiste soient chargés */}
            {isLoading ? (
                <div className="loadingContainer">
                    <div className="loading">Loading…</div>
                </div>
            ) : (
                <div className="partenaires">
                    {partenaires}
                </div>
            )}
        </div>
    );
}