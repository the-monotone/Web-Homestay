import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { GOOGLE_MAP_KEY } from '../config';
import PopupRoomCard from './room/PopupRoomCard';

const Marker = ({children}) => <div className="marker-container">{children}</div>;

const containerStyle = {
  width: '100%',
  height: '86vh'
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
    const center = {
        lat: latitude,
        lng: longitude
    };

    const markers = results.rooms.map((item) => {
        return (
            <Marker key={item.room_id} lat={item.latitude} lng={item.longitude}>
                <OverlayTrigger placement='top' trigger="click" rootClose overlay={<Tooltip className="popup-container align-items-start"><PopupRoomCard room={item} handleClick={() => {handleClickPopup(item.room_id)}} /></Tooltip>}>
                    <Button
                        className="btn-marker"
                        variant="light"
                        size="sm"
                    >
                        <strong>{displayMoney(parseFloat(item.price))}</strong>
                    </Button>
                </OverlayTrigger>
            </Marker>
        )
    });
    return (
        <div style={containerStyle}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: GOOGLE_MAP_KEY }}
                defaultCenter={center} 
                defaultZoom={12}>
                    {markers}
            </GoogleMapReact>
        </div>
    )
}

export default Map;