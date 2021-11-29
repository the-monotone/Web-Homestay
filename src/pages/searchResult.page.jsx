import React from 'react';
import Map from '../components/MapComponent';
import '@goongmaps/goong-js/dist/goong-js.css';
import { RoomList } from '../Fake Data API/roomData';
import { RoomCard } from '../components/room/RoomCard';
import { useLocation, useNavigate } from 'react-router';
const SearchResultPage = () => {
    // const {state} = useLocation();
    // const place = state.place;
    
    const navigate = useNavigate();
    const handleClick = (room) => {
        navigate(`/room/${room.id}`, {state: room} );
    }
    const constPlace = {
        description: "Hà Nội, Việt Nam",
        lat: 21.028195403,
        lng: 105.854159778
    }
    return (
        <div className="row">
            <div className="col col-12 col-md-5">
                <h2>{`Phòng ở tại ${constPlace.description}`}</h2>
                {RoomList.map(room => {
                    return <RoomCard key={room.id} room={room} onClick={() => {handleClick(room)}}/>
                })}
            </div>
            <div className="col d-sm-none d-md-block col-md-7 position-fixed end-0" >
                <Map place={constPlace} />
            </div>
        </div>
    )
}

export default SearchResultPage;