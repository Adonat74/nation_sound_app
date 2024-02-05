import React from "react";
import "./Info_FAQ.css";

export default function Informations () {

    const [informationsData, setInformationsData] = React.useState([]);

    
    React.useEffect(() => {
        fetch('http://localhost/drupal10/jsonapi/node/informations')
            .then(res => res.json())
            .then(data => setInformationsData(data.data));
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
            <h1>Informations</h1>
            <div>
                {informations}
            </div>
        </div>
    );
}