import React from "react";
import { Link } from "react-router-dom"
import "./Programmation.css"

export default function Programmation () {


    const [testItem, setTestItem] = React.useState([1,1,1,1,1,1,1]);
    const [daySelected, setDaySelected] = React.useState("1");
    const [artistesData, setArtistesData] = React.useState([]);

    function handleRadioChange (event) {
        console.log(daySelected)
        setDaySelected(() => {
            return event.target.value
        })
    }


    

    
    React.useEffect(() => {
       
        fetch(`http://drupal10/jsonapi/node/artistes?filter[field_jour]=${daySelected}`)
            .then(res => res.json())
            .then(data => setArtistesData(data.data))
    }, [daySelected]);

    console.log(artistesData);







    const artiste = artistesData.map(data => {
        return (
            <div className="artistContainer">
                <Link to={`/page-artiste/Jacque Chirac`}>
                    <img className="miniature" src={`http://drupal10/sites/default/files/2023-08/${data.attributes.title}.jpg`} alt="Artiste"></img>
                    <div className="infoMiniature">
                        <h2>{data.attributes.title}</h2>
                        <p>Scène numéro {data.attributes.field_scene}</p>
                        <p>{data.attributes.field_heure}H</p>
                    </div>
                </Link>
            </div>
        );
    });


    

    




    return(
        <div className="programmation">
            <h1>Programmation</h1>
            <div className="selectFlex">
                <select className="selectProg">
                    <option>Scène 1</option>
                    <option>Scène 2</option>
                    <option>Scène 3</option>
                    <option>Scène 4</option>
                    <option>Scène 5</option>
                </select>
            </div>
            

            <div className="radioContainer">

                <input 
                    className="radioProgrammation" 
                    type="radio" 
                    id="jour1" 
                    name="jours"
                    value="1"
                    onChange={handleRadioChange}
                />
                <label className={daySelected === "1" ? "daySelected" : null}  htmlFor="jour1">Jour 1</label> 

                <input 
                    className="radioProgrammation"
                    type="radio" 
                    id="jour2" 
                    name="jours"
                    value="2"
                    onChange={handleRadioChange}
                />
                <label className={daySelected === "2" ? "daySelected" : null} htmlFor="jour2">Jour 2</label>     

                <input 
                    className="radioProgrammation"
                    type="radio" 
                    id="jour3" 
                    name="jours"
                    value="3"
                    onChange={handleRadioChange}
                />
                <label className={daySelected === "3" ? "daySelected" : null} htmlFor="jour3">Jour 3</label>

            </div>

            <div className="miniatureGrid">
                {artiste}
            </div>

        </div>
    );
}