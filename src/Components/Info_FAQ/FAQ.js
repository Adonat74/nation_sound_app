import React from "react";
import "./Info_FAQ.css";


export default function FAQ () {

    const [FAQData, setFAQData] = React.useState([]);

    
    React.useEffect(() => {
        fetch('http://localhost/drupal10/jsonapi/node/faq')
            .then(res => res.json())
            .then(data => setFAQData(data.data));
    }, []);

    console.log(FAQData);

    const FAQ = FAQData.map(data => {
        return (
            <div className="question">
                <h2>{data.attributes.title}</h2>
                <p>{data.attributes.field_reponse}</p>
            </div> 
        );
    });

    return(
        <div className="FAQ">
            <h1>FAQ</h1>
            {FAQ}
        </div>
    );
}