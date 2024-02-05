import { useEffect, useState } from "react";
import { drupalAPI } from '../../api/axios';
import "./Partenaires.css"


export default function Partenaires () {

    const [partenairesData, setPartenairesData] = useState([]);


    useEffect(() => {
        drupalAPI.get(`/partners`)
            .then(res => setPartenairesData(res.data.data));
    }, []);


    //console.log(partenairesData);

    const partenaires = partenairesData.map(data => {
        return (
            <div className="partenaire" key={data.id}>
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