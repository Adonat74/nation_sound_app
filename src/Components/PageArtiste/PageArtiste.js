import "./PageArtiste.css";
import React from "react";
import { useParams } from "react-router-dom";


export default function PageArtiste () {

    const {artistTitle} = useParams();

    const [artisteData, setArtisteData] = React.useState({field_heure: 0, field_scene: 0, field_description: 0, field_photo: {uri: 0}});

    


    React.useEffect(() => {
        fetch(`http://localhost/drupal10/jsonapi/node/artistes?filter[title]=${artistTitle}`)
            .then(res => res.json())
            .then(data => setArtisteData(data.data[0].attributes))
    }, []);

    //console.log(artisteData);



    return(
        <div className="pageArtist">
            <div className="pageArtistContainer">
                <img className="artistImage" src={`${artisteData.field_photo.uri}`} alt={`${artistTitle}`}></img>
                <div className="pageArtistText">
                    <h1 className="pageArtistTitle">{artistTitle}</h1>
                    <p>Scène {artisteData.field_scene}</p>
                    <p>{artisteData.field_heure}H</p>
                    <p>{artisteData.field_description}</p>
                </div>
            </div>
        </div>
    );
}