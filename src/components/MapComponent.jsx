import React, { useState, useMemo } from "react";
import { Button } from "react-bootstrap";
import MapGL, { Marker, Popup } from "@goongmaps/goong-map-react";

import PopupRoomCard from "./room/PopupRoomCard";
import { GOONG_MAP_KEY } from "../config";
import "@goongmaps/goong-js/dist/goong-js.css";
import "@goongmaps/goong-geocoder/dist/goong-geocoder.css";

const createArrayDisplay = (length) => {
  let res = [];
  for (var i = 0; i < length; i++) {
    res.push(false);
  }
  return res;
};

const displayMoney = (amount) => {
  var formatter = new Intl.NumberFormat('vi', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  });
  return formatter.format(amount);
}

const Map = ({ latitude, longitude, results, handleClickPopup }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [displayPopups, setDisplayPopups] = useState(() =>
    createArrayDisplay(results.length)
  );

  const [viewport, setViewport] = useState({
    zoom: 12,
    latitude: latitude,
    longitude: longitude,
  });
  
  const markers = useMemo(() => results.rooms.map((item, index) => {
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
    };
    return (
      <div key={item.room_id}>
        <Marker
          latitude={item.latitude}
          longitude={item.longitude}
          offsetLeft={-20}
          offsetTop={-10}
          className="marker-container"
        >
          <Button
            className="btn-marker"
            variant="light"
            size="sm"
            onClick={() => setPopupIndex(index)}
          >
            <strong>{displayMoney(parseFloat(item.price))}</strong>
          </Button>
        </Marker>
        {displayPopups[index] && (
          <Popup
            latitude={item.latitude}
            longitude={item.longitude}
            altitude={100}
            closeButton={false}
            closeOnClick={true}
            className="popup-container"
          >
            <PopupRoomCard room={item} handleClick={() => {handleClickPopup(item.room_id)}} />
          </Popup>
        )}
      </div>
    )}), [results, displayPopups, selectedIndex, handleClickPopup]);

  return (
    <MapGL
      className="map"
      {...viewport}
      width="100%"
      height="100%"
      onViewportChange={setViewport}
      goongApiAccessToken={GOONG_MAP_KEY}
    >
      {markers}
    </MapGL>
  );
};

export default Map;
