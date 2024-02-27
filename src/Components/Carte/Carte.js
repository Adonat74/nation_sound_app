import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { MapContainer, Marker, Popup, ImageOverlay } from 'react-leaflet';
import { drupalAPI } from '../../api/axios';
import 'leaflet/dist/leaflet.css';
import { LatLngBounds, CRS, Icon } from "leaflet";
import "./Carte.css";
import DOMPurify from 'dompurify';
import { Helmet } from 'react-helmet-async';

export default function Carte () {

    const windowSize = useRef([window.innerWidth, window.innerHeight]);
    const width = windowSize.current[0];
    const height = windowSize.current[1];

    // Définition des limites de la carte
    const bounds = new LatLngBounds([0, 0], [height, width]);

    const [catFilter, setCatFilter] = useState("");
    const [mapData, setMapData] = useState([]);
    const [sceneData, setSceneData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    

    // Fonction de gestion du changement de catégorie
    function handleChangeCat (event) {
        setCatFilter(() => {
            return event.target.value
        });
    };

    // Change les paramètres de filtre du fetch
    let catQuery = catFilter === "" ? "" : `?filter[field_categorie]=${catFilter}`;

    // Récupère les données de la carte et des artistes de façon asynchrone
    useEffect(() => {
        async function getData () {
            try {
                // Récupération des données de la carte
                await drupalAPI.get(`/lieux${catQuery}`)
                    .then(res => setMapData(res?.data?.data));

                // Récupération des données des scènes
                await drupalAPI.get(`/artistes`)
                    .then(res => setSceneData(res?.data?.data));

            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        }
        getData();     
    }, [catFilter, catQuery]);


    const markers = mapData.map(data => {

        const category = DOMPurify.sanitize(data.attributes.field_categorie);
        const title = DOMPurify.sanitize(data.attributes.title);
        const sceneNumber = title[title.length - 1];

        // customise les icons des balises
        const customIcon = new Icon({
            iconUrl: `/images/icons/pin-${category}.svg`,
            iconSize: [35, 35]
        });

        // eslint-disable-next-line
        const scene = sceneData.map(scene => {

            const sceneSanitized = DOMPurify.sanitize(scene.attributes.field_scene);
            const titleSanitized = DOMPurify.sanitize(scene.attributes.title);


            // Affiche les artiste dans le popup
            if (sceneSanitized === sceneNumber) {
                return  (
                    <p key={scene.id}>
                        {titleSanitized}
                    </p>
                );
            }
        });

        const lat = DOMPurify.sanitize(data.attributes.field_lat);
        const lng = DOMPurify.sanitize(data.attributes.field_lng);
        const descriptionLieu = DOMPurify.sanitize(data.attributes.field_description_lieu);


        
        return (
            // Les balises sont positionnés entre 0-500 et 0-1000 mais la hauteur et la largeur de la carte peuvent changer donc un produit en croix permet qu'elles restent au bon endroit
            <Marker position={[lat*height/500, lng*width/1000]} icon={customIcon} key={data.id}>
                <Popup className="popup">
                    {/* Si c'est une scène on redirige vers la page programmation au clic */}
                    <Link to={category === "scene" ? `/programmation` : ""}>
                        <h2 className="popupTitle">{title}</h2>
                        <div className="mapArtistes">
                            {/* Si c'est une scnène on n'affiche rien sinon la description du lieu*/}
                            <p>{category === "scene" ? "" : descriptionLieu}</p>
                            {/* Affiche la liste des artistes en fonction des scnènes */}
                            {scene}
                        </div>
                    </Link>
                </Popup>
            </Marker>
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
                <title>Nation-Sound Festival - Carte</title>
                <meta name="title" content="Nation-Sound Festival - Carte" />
                <meta name="description" content="Trouvez le lieu des différents restaurants, bars, toilettes et les scènes qui composent le festival grâce à la carte interactive." />
            </Helmet>
            {/* Affiche Loading... le temps que les artiste soient chargés */}
            {isLoading ? (
                <div className="loadingContainer">
                    <div className="loading">Loading…</div>
                </div>
            ) : (
                <div id="map">
                    <div className="filter">
                        <select
                        value={catFilter}
                        onChange={handleChangeCat}
                        name="catChoice"
                        className="catFilter">
                            <option value="">Toutes les catégories</option>
                            <option value="scene">Scènes</option>
                            <option value="restauration">Restauration</option>
                            <option value="buvette">Buvettes</option>
                            <option value="toilettes">Toilettes</option>
                        </select>
                    </div>

                    <MapContainer 
                        center={[height/2, width/2]} 
                        zoom={0} 
                        maxZoom={3} 
                        dragging={false}
                        touchZoom={true}
                        scrollWheelZoom={true} 
                        crs={CRS.Simple}
                           
                        maxBounds={[[height/10, width/10], [height-height/10, width-width/10]]}
                    >
                        {/* Remplace la carte par une image */}
                        <ImageOverlay
                            url="images/map.png"
                            bounds={bounds}
                            zIndex={10}              
                        />
                        {/* Affiche les balises */}
                        {markers}  
                    </MapContainer>
                </div>
            )}  
        </div>
    );
}