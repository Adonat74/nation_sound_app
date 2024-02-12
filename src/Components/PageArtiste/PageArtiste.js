import "./PageArtiste.css";
import { useEffect, useState } from "react";
import React from "react";
import { useParams } from "react-router-dom";
import { drupalAPI } from '../../api/axios';
import DOMPurify from 'dompurify';




export default function PageArtiste () {

    const { artistTitle } = useParams();

    const [artisteData, setArtisteData] = useState({field_heure: 0, field_scene: 0, field_description: 0, field_photo: {uri: 0}});


    useEffect(() => {
        drupalAPI.get(`/artistes?filter[title]=${artistTitle}`)
            .then(res => setArtisteData(res?.data?.data[0]?.attributes));
    }, [artistTitle]);
    
    //console.log(artisteData);

    
    let url = DOMPurify.sanitize(artisteData.field_photo.uri);
    let description = DOMPurify.sanitize(artisteData.field_description);
    let hour = DOMPurify.sanitize(artisteData.field_heure);
    let scene = DOMPurify.sanitize(artisteData.field_scene);

    return(
        <div className="pageArtist">
            <div className="pageArtistContainer">
                <img className="artistImage" src={`${url}`} alt={`${artistTitle}`}></img>
                <div className="pageArtistText">
                    <h1 className="pageArtistTitle">{artistTitle}</h1>
                    <p>Scène {scene}</p>
                    <p>{hour}H</p>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    );
}