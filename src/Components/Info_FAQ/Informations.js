import { useEffect, useState } from "react";
import { drupalAPI } from '../../api/axios';
import "./Info_FAQ.css";
import { Helmet } from 'react-helmet-async';

export default function Informations () {

    const [informationsData, setInformationsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    // get data asynchronously
    useEffect(() => {
        async function getData () {
            try {
                await drupalAPI.get(`/informations`)
                    .then(res => setInformationsData(res?.data?.data));
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        }
        getData();     
    }, []);

    // useEffect(() => {
    //     drupalAPI.get(`/informations`)
    //         .then(res => setInformationsData(res?.data?.data));
    // }, []);


    const informations = informationsData.map(data => {
        return (
            <div className="information" key={data.id}>
                <h2>{data.attributes.title}</h2>
                <p>{data.attributes.field_description_information}</p>
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