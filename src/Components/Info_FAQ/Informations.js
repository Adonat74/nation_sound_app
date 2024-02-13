import { useEffect, useState } from "react";
import { drupalAPI } from '../../api/axios';
import "./Info_FAQ.css";
import { Helmet } from 'react-helmet-async';

export default function Informations () {

    const [informationsData, setInformationsData] = useState([]);



    useEffect(() => {
        drupalAPI.get(`/informations`)
            .then(res => setInformationsData(res?.data?.data));
    }, []);

    //console.log(informationsData);

    const informations = informationsData.map(data => {
        return (
            <div className="information" key={data.id}>
                <h2>{data.attributes.title}</h2>
                <p>{data.attributes.field_description_information}</p>
            </div> 
        );
    });

    return(
        <div className="informations">
            <Helmet>
                <title>Nation-Sound Festival - Informations</title>
                <meta name="title" content="Nation-Sound Festival - Informations" />
                <meta name="description" content="Tenez-vous informés des dernières nouvelles et informations concernant le festival." />
            </Helmet>
            <h1>Informations</h1>
            {informations}
        </div>
    );
}