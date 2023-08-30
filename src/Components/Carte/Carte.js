import React from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup, ImageOverlay} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { LatLngBounds, Map, CRS} from "leaflet";
import "./Carte.css"

export default function Carte () {


    /*[40.712216, -74.22655], [40.773941, -74.12544]*/



    const bounds = new LatLngBounds([-75.31147, -177.09238], [75.22568, 172.61348])



    return(
        <div id="map">
            <MapContainer center={[10.712216, -0.22655]} zoom={2} scrollWheelZoom={true}>
            <ImageOverlay
                url="http://drupal10/sites/default/files/2023-08/Capture%20d%27%C3%A9cran%202023-08-30%20175241.png"
                bounds={bounds}
                zIndex={10}
/>
                
            </MapContainer>
            

        </div>
    );
}