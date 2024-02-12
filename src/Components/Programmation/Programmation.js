import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { drupalAPI } from '../../api/axios';
import useAuth from "../../hooks/useAuth";
import "./Programmation.css";
import DOMPurify from 'dompurify';

export default function Programmation () {

    const { auth } = useAuth();
    const [daySelected, setDaySelected] = useState("1");
    const [artistesData, setArtistesData] = useState([]);
    const [scene, setScene] = useState("");

    let genre = auth.favoriteMusicGenre;

    function handleRadioChange (event) {
        setDaySelected(() => {
            return event.target.value
        });
    };

    function handleChangeScene (event) {
        setScene(() => {
            return event.target.value
        });
    };



    let sceneQuery = scene === "" ? "" : `&filter[field_scene]=${scene}`;


    useEffect(() => {
        drupalAPI.get(`/artistes?sort=field_heure&filter[field_day]=${daySelected}${sceneQuery}`)
            .then(res => {
                let sorted = res?.data?.data.sort((x) => x.attributes.field_music_genre === genre ? -1 : 0);
                setArtistesData(sorted);
            });
    }, [daySelected, scene, sceneQuery, genre]);



    //console.log(genre)
    



    const artiste = artistesData.map(data => {

        let title = DOMPurify.sanitize(data.attributes.title);
        let url = DOMPurify.sanitize(data.attributes.field_photo.uri);
        let hour = DOMPurify.sanitize(data.attributes.field_heure);
        let scene = DOMPurify.sanitize(data.attributes.field_scene);

        return (
            <div className="artistContainer" key={data.id}>
                <Link to={`/page-artiste/${title}`}>
                    <img className="miniature" src={`${url}`} alt={`${title}`}></img>
                    <div className="infoMiniature">
                        <h2>{title}</h2>
                        <p>Scène {scene}</p>
                        <p>{hour}H</p>
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
            </div>

        </div>
    );
}