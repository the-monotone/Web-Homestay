import React, { useState } from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import ReactMapGL, { Marker, Popup } from '@goongmaps/goong-map-react';
import PopupRoomCard from './room/PopupRoomCard';
import { GOONG_MAP_KEY } from '../config';
import '@goongmaps/goong-js/dist/goong-js.css';

const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Simple tooltip
    </Tooltip>
);

const createArrayDisplay = (length) => {
    let res = [];
    for (var i = 0; i < length; i++) {
        res.push(false);
    }
    return res;
}

const Map = ({place, results}) => {
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [displayPopups, setDisplayPopups] = useState(() => createArrayDisplay(results.length));
    const setPopupIndex = (index) => {
        const newDisplayPopups = [...displayPopups];
        if (index !== selectedIndex) {
            if (selectedIndex != null) {
                newDisplayPopups[selectedIndex] = false;
            }
            newDisplayPopups[index] = !newDisplayPopups[index];
        } else {
            newDisplayPopups[index] = !newDisplayPopups[index];
        }
        setSelectedIndex(index);
        setDisplayPopups(newDisplayPopups);
    }
    const [viewport, setViewport] = useState({
        zoom: 12,
        latitude: place.lat,
        longitude: place.lng
    })
    return (
        <ReactMapGL 
            className="map"
            {...viewport}
            width="100%"
            height="100%"
            onViewportChange={nextViewport => {setViewport(nextViewport)}}
            goongApiAccessToken={GOONG_MAP_KEY}
        >
            {results.map((item, index) => {
                return (
                    <div key={item.room_id}>
                        <Marker latitude={item.latitude} longitude={item.longitude} offsetLeft={-20} offsetTop={-10}>
                            <Button size="sm" onClick={() => setPopupIndex(index)}>{`${item.price}₫`}</Button>
                        </Marker>
                        {
                            displayPopups[index] && 
                            <Popup latitude={item.latitude} longitude={item.longitude} altitude={100} closeButton={false} closeOnClick={true}>
                                <PopupRoomCard room={item} />
                            </Popup>
                        }       
                    </div>
                )
            })}
        </ReactMapGL>
    )
}

export default Map;