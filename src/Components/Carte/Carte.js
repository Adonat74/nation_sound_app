import React from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup, ImageOverlay } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngBounds, Map, CRS, Icon } from "leaflet";
import "./Carte.css";

export default function Carte () {

    const bounds = new LatLngBounds([0, 0], [500, 1000]);

    const [catFilter, setCatFilter] = React.useState("");
    const [mapData, setMapData] = React.useState([]);

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



    const markers = mapData.map(data => {
        const customIcon = new Icon({
            iconUrl: `/images/icons/pin-${data.attributes.field_categorie}.svg`,
            iconSize: [35, 35]
        });
        return (
            <Marker position={[data.attributes.field_lat, data.attributes.field_lng]} icon={customIcon}>
                <Popup>
                    <h2>{data.attributes.title}</h2>
                    <p>{data.attributes.field_description_lieu}</p>
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