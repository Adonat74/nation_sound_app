import React from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup, ImageOverlay } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { LatLngBounds, Map, CRS, Icon } from "leaflet";
import "./Carte.css"

export default function Carte () {

    const customIcon = new Icon({
        iconUrl: "/images/icons/pin-scene.svg",
        iconSize: [35, 35]
    });

    const bounds = new LatLngBounds([0, 0], [500, 1000]);



    const [mapData, setMapData] = React.useState([]);

    
    React.useEffect(() => {
       
        fetch(`http://drupal10/jsonapi/node/lieu_carte`)
            .then(res => res.json())
            .then(data => setMapData(data.data))
            
    }, []);

    console.log(mapData);

    const markers = mapData.map(data => {
        const customIconMap = new Icon({
            iconUrl: `/images/icons/pin-${data.attributes.field_cat}.svg`,
            iconSize: [35, 35]
        });
        return (
            <Marker position={[data.attributes.field_lat, data.attributes.field_lng]} icon={customIconMap}>
                <Popup>
                    <h2>{data.attributes.title}</h2>
                    <p>{data.attributes.field_description_lieu.value}</p>
                </Popup>
            </Marker>
        )
    })





    return(
        <div id="map">

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