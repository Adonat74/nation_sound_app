import React from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup, ImageOverlay } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { LatLngBounds, Map, CRS, Icon } from "leaflet";
import "./Carte.css"

export default function Carte () {

    const bounds = new LatLngBounds([0, 0], [500, 1000]);

    const [catFilter, setCatFilter] = React.useState("");
    const [mapData, setMapData] = React.useState([]);

    function handleChangeCat (event) {
        console.log(catFilter)
        setCatFilter(() => {
            return event.target.value
        })
    };

    let catQuery = catFilter === "" ? "" : `?filter[field_cat]=${catFilter}`;

    
    React.useEffect(() => {
       
        fetch(`http://drupal10/jsonapi/node/lieu_carte${catQuery}`)
            .then(res => res.json())
            .then(data => setMapData(data.data))
            
    }, [catFilter]);

    console.log(mapData);

    const markers = mapData.map(data => {
        const customIcon = new Icon({
            iconUrl: `/images/icons/pin-${data.attributes.field_cat}.svg`,
            iconSize: [35, 35]
        });
        return (
            <Marker position={[data.attributes.field_lat, data.attributes.field_lng]} icon={customIcon}>
                <Popup>
                    <h2>{data.attributes.title}</h2>
                    <p>{data.attributes.field_description_lieu.value}</p>
                </Popup>
            </Marker>
        )
    })





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
                    url="http://drupal10/sites/default/files/2023-08/Capture%20d%27%C3%A9cran%202023-08-30%20175241.png"
                    bounds={bounds}
                    zIndex={10}                  
                />
                {markers}  
            </MapContainer>
        </div>
    );
}