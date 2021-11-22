import React, { useState } from 'react';
import ReactMapGL from '@goongmaps/goong-map-react';
import '@goongmaps/goong-js/dist/goong-js.css';
import { GOONG_MAP_KEY } from '../config';

const Map = ({place}) => {
    const [viewport, setViewport] = useState({
        zoom: 14,
        latitude: place.lat,
        longitude: place.lng
    })
    return (
        <ReactMapGL 
            className="map"
            {...viewport}
            width="100%"
            height="80vh"
            onViewportChange={nextViewport => {setViewport(nextViewport)}}
            goongApiAccessToken={GOONG_MAP_KEY}
        />
    )
}

export default Map;