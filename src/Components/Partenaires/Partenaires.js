import { useEffect, useState } from "react";
import { drupalAPI } from '../../api/axios';
import "./Partenaires.css";
import DOMPurify from 'dompurify';
import { Helmet } from "react-helmet";



export default function Partenaires () {

    const [partenairesData, setPartenairesData] = useState([]);


    useEffect(() => {
        drupalAPI.get(`/partners`)
            .then(res => setPartenairesData(res?.data?.data));
    }, []);

    //console.log(partenairesData);

    const partenaires = partenairesData.map(data => {

        let title = DOMPurify.sanitize(data.attributes.title);
        let url = DOMPurify.sanitize(data.attributes.field_partners_logo_url.uri);

        return (
            <div className="partenaire" key={data.id}>
                <img className="partenaire-logo" src={`${url}`} alt={`${title}`}></img>
                <h3 className="partenaire-title">{title}</h3>
            </div> 
        );
    });
    

    return(
        <div className="partenaires">
            <Helmet>
                <title>Nation-Sound Festival - Partenaires</title>
                <meta name="title" content="Nation-Sound Festival - Partenaires" />
                <meta name="description" content="Les partenaires du festival." />
            </Helmet>
            {partenaires}
        </div>
    );
}