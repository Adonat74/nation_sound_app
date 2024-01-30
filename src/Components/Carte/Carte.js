import React from "react";
import { Link } from "react-router-dom";
import { MapContainer, Marker, Popup, ImageOverlay } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngBounds, CRS, Icon } from "leaflet";
import "./Carte.css";

export default function Carte () {

    const bounds = new LatLngBounds([0, 0], [500, 1000]);

    const [catFilter, setCatFilter] = React.useState("");
    const [mapData, setMapData] = React.useState([]);
    const [sceneData, setSceneData] = React.useState([]);
    

    function handleChangeCat (event) {
        setCatFilter(() => {
            return event.target.value
        });
    };


    let catQuery = catFilter === "" ? "" : `?filter[field_categorie]=${catFilter}`;

    React.useEffect(() => {
        fetch(`http://localhost/drupal10/jsonapi/node/lieux${catQuery}`)
            .then(res => res.json())
            .then(data => setMapData(data.data));
    }, [catFilter]);

    React.useEffect(() => {
        fetch(`http://localhost/drupal10/jsonapi/node/artistes`)
            .then(res => res.json())
            .then(data => setSceneData(data.data));
    }, []);




    const markers = mapData.map(data => {

        const title = data.attributes.title;
        const sceneNumber = title[title.length - 1];

        const customIcon = new Icon({
            iconUrl: `/images/icons/pin-${data.attributes.field_categorie}.svg`,
            iconSize: [35, 35]
        });

        const scene = sceneData.map(scene => {
            if (scene.attributes.field_scene == parseInt(sceneNumber)) {
                return  (
                    <p>
                        {scene.attributes.title}
                    </p>
                );
            }
        });

        
        return (
            <Marker position={[data.attributes.field_lat, data.attributes.field_lng]} icon={customIcon}>
                <Popup className="popup">
                    <Link to={data.attributes.field_categorie === "scene" ? `/programmation` : ""}>
                        <h2 className="popupTitle">{title}</h2>
                        <div className="mapArtistes">
                            <p>{data.attributes.field_categorie === "scene" ? "" : data.attributes.field_description_lieu}</p>
                            {scene}
                        </div>
                    </Link>
                </Popup>
            </Marker>
        );
    });






    return(
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