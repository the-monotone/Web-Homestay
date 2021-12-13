import React, { useState, useEffect, useContext } from 'react';
import Map from '../components/MapComponent';
import '@goongmaps/goong-js/dist/goong-js.css';
import { RoomCard } from '../components/room/RoomCard';
import { useNavigate } from 'react-router';
import Layout from '../components/layout.component';
import { useLocation } from 'react-router-dom';
import { SearchContext } from '../context/searchContext';

const SearchResultPage = () => {
    const {state} = useLocation();
    let { place, searchPlaceApi } = useContext(SearchContext);
    let searchBody = state;
    if (searchBody === null) {
        searchBody = JSON.parse(localStorage.getItem("search-query"));
    }
    if (place.description === "") {
        place = JSON.parse(localStorage.getItem("place"));
    }
    const [results, setResults] = useState({
        total: null,
        rooms: []
    });
    useEffect(() => {
        searchPlaceApi(searchBody)
            .then(res => {
                console.log(res);
                setResults(res);
            })
            .catch(err => {
                const error = new Error(err.message);
                alert(error);
            })
    })
    const navigate = useNavigate();
    const handleClick = (roomId) => {
        navigate(`/room/${roomId}`);
    }
    return (
        <Layout styleName="vh-100" containerStyleName="container-fluid">
            <div className="row">
                <div className="col col-12 col-lg-5">
                    <h2>{`Phòng ở tại ${place.description}`}</h2>
                    {results.rooms.map(room => {
                        return (
                            <div key={room.room_id} className="result-item">
                                <RoomCard room={room} onClick={() => {handleClick(room.room_id)}}/>
                            </div>
                        )
                    })}
                </div>
                <div className="col d-none d-lg-block col-lg-7 h-100 position-fixed end-0" >
                    <Map place={place} results={results} handleClickPopup={handleClick}/>
                </div>
            </div>
        </Layout>
    )
}

export default SearchResultPage;