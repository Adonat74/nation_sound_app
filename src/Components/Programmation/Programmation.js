import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { drupalAPI } from '../../api/axios';
import useAuth from "../../hooks/useAuth";
import "./Programmation.css";
import DOMPurify from 'dompurify';
import { Helmet } from 'react-helmet-async';

export default function Programmation () {

    //importe le context authProvider
    const { auth } = useAuth();

    // États pour le jour sélectionné, la scène et les données des artistes
    const [daySelected, setDaySelected] = useState("1");
    const [scene, setScene] = useState("");
    const [artistesData, setArtistesData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // stock le genre musical préféré de l'utilisateur grace au context authProvider.
    const genre = auth.favoriteMusicGenre;

    // Fonction de prenant en charge le changement de jour
    function handleRadioChange (event) {
        setDaySelected(() => {
            return event.target.value
        });
    };

    // Fonction de prenant en charge le changement de scène
    function handleChangeScene (event) {
        setScene(() => {
            return event.target.value
        });
    };



    // variable contenant le paramêtre d'url pour filtrer ou non en fonction de la scène
    let sceneQuery = scene === "" ? "" : `&filter[field_scene]=${scene}`;


    // Fetch des données des artistes
    useEffect(() => {
        async function getData () {
            try {
                await drupalAPI.get(`/artistes?sort=field_hour&filter[field_day]=${daySelected}${sceneQuery}`)
                    .then(res => {
                        // Trie les artistes en fonction du genre préféré par l'utilisateur et les faits apparaitre en premier.
                        let sorted = res?.data?.data.sort((x) => x.attributes.field_music_genre === genre ? -1 : 0);
                        setArtistesData(sorted);
                    });
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        }
        getData();     
    }, [daySelected, scene, sceneQuery, genre]);


    // Construction des composants d'artiste
    const artiste = artistesData.map(data => {

        let title = DOMPurify.sanitize(data.attributes.title);
        let url = DOMPurify.sanitize(data.attributes.field_photo.uri);
        let hour = DOMPurify.sanitize(data.attributes.field_hour);
        let scene = DOMPurify.sanitize(data.attributes.field_scene);

        return (
            <div className="artistContainer" key={data.id}>
                <Link to={`/page-artiste/${title}`}>
                    <img className="miniature" src={`${url}`} alt={`${title}`} loading="lazy"></img>
                    <div className="infoMiniature">
                        <h2>{title}</h2>
                        <p>Scène {scene}</p>
                        <p>{hour}H</p>
                    </div>
                </Link>
            </div>
        );
    });


    // permet d'afficher une page d'erreur plutot que de faire crasher toute l'application lors du get
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    

    return(
        <div>
            {/* Permet de changer les title et description pour chaques composants */}
            <Helmet>
                <title>Nation-Sound Festival - Programmation</title>
                <meta name="title" content="Nation-Sound Festival - Programmation" />
                <meta name="description" content="Tous les artistes et groupes de musique qui monteront sur scène ce weekend." />
            </Helmet>
            {/* Affiche Loading... le temps que les artiste soient chargés */}
            {isLoading ? (
                <div className="loadingContainer">
                    <div className="loading">Loading…</div>
                </div>
            ) : (
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
            )}
        </div>
    );
}