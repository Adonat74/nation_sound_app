import React from "react";
import "./Partenaires.css"


export default function FAQ () {

    const [partenairesData, setPartenairesData] = React.useState([]);

    
    React.useEffect(() => {
        fetch('http://drupal10/jsonapi/node/partenaires',{
            method: "GET",
            withCredentials: true,    
            crossorigin: true, 
            mode: 'no-cors',
            headers: {
              "access-control-allow-origin" : "*"
            }})
            .then(res => res.json())
            .then(data => setPartenairesData(data.data))
    }, []);

    console.log(partenairesData);

    const partenaires = partenairesData.map(data => {
        return (
            <h3 className="partenaire">{data.attributes.title}</h3>
        )
    })
    


    
    



    return(
        <div className="partenaires">
            
            {partenaires}
        </div>
    );
}