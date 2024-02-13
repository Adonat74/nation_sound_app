import { useEffect, useState } from "react";
import { drupalAPI } from '../../api/axios';
import "./Info_FAQ.css";
import { Helmet } from "react-helmet";


export default function FAQ () {

    const [FAQData, setFAQData] = useState([]);


    useEffect(() => {
        drupalAPI.get(`/faq`)
            .then(res => setFAQData(res?.data?.data));
    }, []);

    //console.log(FAQData);

    const FAQ = FAQData.map(data => {
        return (
            <div className="question" key={data.id}>
                <h2>{data.attributes.title}</h2>
                <p>{data.attributes.field_reponse}</p>
            </div> 
        );
    });

    return(
        <div className="FAQ">
            <Helmet>
                <title>Nation-Sound Festival - Foire Aux Questions</title>
                <meta name="title" content="Nation-Sound Festival - Foire Aux Questions" />
                <meta name="description" content="Trouvez la réponse aux questions les plus fréquement posées sur le déroulement du festival, le paiment et le fonctionnement du site." />
            </Helmet>
            <h1>FAQ</h1>
            {FAQ}
        </div>
    );
}