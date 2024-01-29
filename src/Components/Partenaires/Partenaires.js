import React from "react";
import "./Partenaires.css"


export default function Partenaires () {

    const [partenairesData, setPartenairesData] = React.useState([]);

    
    React.useEffect(() => {
        fetch('http://localhost/drupal10/jsonapi/node/partners')
            .then(res => res.json())
            .then(data => setPartenairesData(data.data))
    }, []);

    console.log(partenairesData);

    const partenaires = partenairesData.map(data => {
        return (
            <div className="partenaire">
                <img className="partenaire-logo" src={`${data.attributes.field_partners_logo_url.uri}`} alt={`${data.attributes.title}`}></img>
                <h3 className="partenaire-title">{data.attributes.title}</h3>
            </div> 
        )
    })
    

    return(
        <div className="partenaires">
            {partenaires}
        </div>
    );
}