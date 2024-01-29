import "./PageArtiste.css"
import React from "react";
import { useParams } from "react-router-dom"


export default function PageArtiste () {

    const [artisteData, setArtisteData] = React.useState({field_heure: 0, field_scene: 0, field_description: {value: 0}});

    const {artistTitle} = useParams();


    // React.useEffect(() => {


    //     fetch(`http://drupal10/jsonapi/node/artistes?filter[title]=${artistTitle}`)
    //         .then(res => res.json())
    //         .then(data => setArtisteData(data.data[0].attributes))
    // }, []);

    console.log(artistTitle);
    console.log(artisteData);


    return(
        <div className="pageArtist">
            <div className="pageArtistContainer">
                <img className="artistImage" src={`http://drupal10/sites/default/files/2023-08/${artistTitle}.jpg`} alt="Jacque Chirac avec sa guitare"></img>
                <div className="pageArtistText">
                    <h1 className="pageArtistTitle">{artistTitle}</h1>
                    <p>Scène {artisteData.field_scene}</p>
                    <p>{artisteData.field_heure}H</p>
                    <p>{artisteData.field_description.value}</p>
                </div>
            </div>
            
            
        </div>
    );
}