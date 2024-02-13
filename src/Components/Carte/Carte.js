import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapContainer, Marker, Popup, ImageOverlay } from 'react-leaflet';
import { drupalAPI } from '../../api/axios';
import 'leaflet/dist/leaflet.css';
import { LatLngBounds, CRS, Icon } from "leaflet";
import "./Carte.css";
import DOMPurify from 'dompurify';
import { Helmet } from 'react-helmet-async';

export default function Carte () {

    const bounds = new LatLngBounds([0, 0], [500, 1000]);

    const [catFilter, setCatFilter] = useState("");
    const [mapData, setMapData] = useState([]);
    const [sceneData, setSceneData] = useState([]);
    

    function handleChangeCat (event) {
        setCatFilter(() => {
            return event.target.value
        });
    };


    let catQuery = catFilter === "" ? "" : `?filter[field_categorie]=${catFilter}`;

    useEffect(() => {
        drupalAPI.get(`/lieux${catQuery}`)
            .then(res => setMapData(res?.data?.data));
    }, [catFilter, catQuery]);

    useEffect(() => {
        drupalAPI.get(`/artistes`)
            .then(res => setSceneData(res?.data?.data));
    }, []);



    const markers = mapData.map(data => {

        const category = DOMPurify.sanitize(data.attributes.field_categorie);

        const title = data.attributes.title;
        const sceneNumber = DOMPurify.sanitize(title[title.length - 1]);

        const customIcon = new Icon({
            iconUrl: `/images/icons/pin-${category}.svg`,
            iconSize: [35, 35]
        });

        // eslint-disable-next-line
        const scene = sceneData.map(scene => {

            const sceneSanitized = DOMPurify.sanitize(scene.attributes.field_scene);
            const titleSanitized = DOMPurify.sanitize(scene.attributes.title);


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
            <Marker position={[lat, lng]} icon={customIcon} key={data.id}>
                <Popup className="popup">
                    <Link to={category === "scene" ? `/programmation` : ""}>
                        <h2 className="popupTitle">{title}</h2>
                        <div className="mapArtistes">
                            <p>{category === "scene" ? "" : descriptionLieu}</p>
                            {scene}
                        </div>
                    </Link>
                </Popup>
            </Marker>
        );
    });






    return(
        <div id="map">
            <Helmet>
                <title>Nation-Sound Festival - Carte</title>
                <meta name="title" content="Nation-Sound Festival - Carte" />
                <meta name="description" content="Trouvez le lieu des différents restaurants, bars, toilettes et les scènes qui composent le festival grâce à la carte interactive." />
            </Helmet>
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



            <MapContainer center={[250, 500]} zoom={0} maxZoom={3} scrollWheelZoom={true} crs={CRS.Simple}>
                <ImageOverlay
                    url="images/map.png"
                    bounds={bounds}
                    zIndex={10}                  
                />
                {markers}  
            </MapContainer>
        </div>
    );
}