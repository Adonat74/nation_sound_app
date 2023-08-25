import React from "react";
import "./Partenaires.css"

export default function FAQ () {


    React.useEffect(function () {
        fetch('http://drupal10/jsonapi/node/partenaires',{
            method: "GET",
            withCredentials: true,    
            crossorigin: true, 
            headers: {
              "access-control-allow-origin" : "*"
            },
            mode: "no-cors"})
            .then(res => res.json())
            .then(data => console.log(data))
    }, []);

    return(
        <div className="partenaires">
            
            
        </div>
    );
}