import React from "react";
import { Link } from "react-router-dom"
import "./Programmation.css"

export default function Programmation () {


    const [daySelected, setDaySelected] = React.useState("1");
    const [artistesData, setArtistesData] = React.useState([]);
    const [scene, setScene] = React.useState("");

    function handleRadioChange (event) {
        setDaySelected(() => {
            return event.target.value
        })
    };

    function handleChangeScene (event) {
        setScene(() => {
            return event.target.value
        })
    };

    let sceneQuery = scene === "" ? "" : `&filter[field_scene]=${scene}`;


    
    // React.useEffect(() => {
       
    //     fetch(`http://drupal-api-nation-sound.free.nf/jsonapi/node/artistes?sort=field_heure&filter[field_jour]=${daySelected}${sceneQuery}`)
    //         .then(res => res.json())
    //         .then(data => setArtistesData(data.data))
    // }, [daySelected, scene]);



    const artiste = artistesData.map(data => {
        return (
            <div className="artistContainer">
                <Link to={`/page-artiste/${data.attributes.title}`}>
                    <img className="miniature" src={`http://drupal-api-nation-sound.free.nf/sites/default/files/2023-08/${data.attributes.title}.jpg`} alt="Artiste"></img>
                    <div className="infoMiniature">
                        <h2>{data.attributes.title}</h2>
                        <p>Scène {data.attributes.field_scene}</p>
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
                <select
                value={scene}
                onChange={handleChangeScene}
                name="sceneChoice"
                className="selectProg">
                    <option value="">Toutes les scènes</option>
                    <option value="1">Scène 1</option>
                    <option value="2">Scène 2</option>
                    <option value="3">Scène 3</option>
                    <option value="4">Scène 4</option>
                    <option value="5">Scène 5</option>
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
                <img src="https://upload.wikimedia.org/wikipedia/commons/d/db/Daft_Punk_in_2013.jpg"></img>
            </div>

        </div>
    );
}