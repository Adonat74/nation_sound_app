import "./PageArtiste.css";
import { useEffect, useState } from "react";
import React from "react";
import { useParams } from "react-router-dom";
import { drupalAPI } from '../../api/axios';
import DOMPurify from 'dompurify';
import { Helmet } from 'react-helmet-async';




export default function PageArtiste () {

    const { artistTitle } = useParams();

    const [artisteData, setArtisteData] = useState({field_heure: 0, field_scene: 0, field_description: 0, field_photo: {uri: 0}});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    // get data asynchronously
    useEffect(() => {
        async function getData () {
            try {
                await drupalAPI.get(`/artistes?filter[title]=${artistTitle}`)
                    .then(res => setArtisteData(res?.data?.data[0]?.attributes));
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        }
        getData();     
    }, [artistTitle]);
    

    
    let url = DOMPurify.sanitize(artisteData.field_photo.uri);
    let description = DOMPurify.sanitize(artisteData.field_description);
    let hour = DOMPurify.sanitize(artisteData.field_heure);
    let scene = DOMPurify.sanitize(artisteData.field_scene);


    // permet d'afficher une page d'erreur plutot que de faire crasher toute l'application lors du get
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return(
        <div>
            {/* Permet de changer les title et description pour chaques composants */}
            <Helmet>
                <title>Nation-Sound Festival - {artistTitle}</title>
                <meta name="title" content={`Nation-Sound Festival - ${artistTitle}`} />
                <meta name="description" content={`${artistTitle} - ${description}`} />
            </Helmet>
            {/* Affiche Loading... le temps que les artiste soient chargés */}
            {isLoading ? (
                <div className="loadingContainer">
                    <div className="loading">Loading…</div>
                </div>
            ) : (
                <div className="pageArtist">
                    <div className="pageArtistContainer">
                        <img className="artistImage" src={`${url}`} alt={`${artistTitle}`} loading="lazy"></img>
                        <section className="pageArtistText">
                            <h1 className="pageArtistTitle">{artistTitle}</h1>
                            <p>Scène {scene}</p>
                            <p>{hour}H</p>
                            <p>{description}</p>
                        </section>
                    </div>
                </div>
            )}
        </div>
    );
}