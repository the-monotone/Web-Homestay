/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import Map from '../components/MapComponent';
import '@goongmaps/goong-js/dist/goong-js.css';
import { RoomCard } from '../components/room/roomCard';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import Layout from '../components/layout.component';
import { SearchContext } from '../context/searchContext';
import { FeedbackContext } from '../context/feedbackContext';

import { Button, Spinner } from 'react-bootstrap';
import './search.css';

const SearchResultPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const description = searchParams.get("description");
    const [isLoading, setLoading] = useState(false);
    const [location, setLocation] = useState(null);
    const {searchPlaceApi} = useContext(SearchContext);
    const {getFavorite} = useContext(FeedbackContext);
    const [results, setResults] = useState({
        total: null,
        rooms: []
    });
    const userState = JSON.parse(localStorage.getItem("user-state"));
    const [favoriteList, setFavoriteList] = useState([]);

    const [showMap, setShowMap] = useState(false);
    const [buttonContent, setButtonContent] = useState("Hiện bản đồ");
    const toggleShowMap = () => {
        setShowMap(prevState => !prevState);
        setButtonContent(prevState => prevState === "Hiện bản đồ"? "Hiện danh sách phòng" : "Hiện bản đồ");
    }


    useEffect(() => {
        let isActive = true;
        setLoading(true);
        setSearchParams(createSearchParams(JSON.parse(localStorage.getItem("search"))));
        setLocation({
            latitude: parseFloat(searchParams.get("latitude")),
            longitude: parseFloat(searchParams.get("longitude")),
        })
        const searchBody = {
            latitude: parseFloat(searchParams.get("latitude")),
            longitude: parseFloat(searchParams.get("longitude")),
            begin_date: searchParams.get("begin_date"),
            end_date: searchParams.get("end_date"),
            radius: 10,
            num_guest: searchParams.get("num_guest"),
        }
        searchPlaceApi(searchBody)
            .then(res => {
                if (isActive) {
                    setResults(res);
                    setLoading(false);
                }
            })
            .catch(err => {
                const error = new Error(err.message);
                alert(error);
            })
        if (userState != null) {
            getFavorite(userState.token)
                .then(res => {
                    if (isActive) setFavoriteList(res);
                })
                .catch(err => {
                    alert(err);
                })
        }
        return () => {
            isActive = false;
        }
    }, [searchParams])

    const handleClick = (roomId) => {
        navigate(`/room/${roomId}`);
    }
    return (
        <Layout styleName="mt-2 vh-100" containerStyleName="container-fluid" showFooter={false}>
            {
            isLoading? <Spinner animation='border' /> :
            <div className="row h-100">
                <div className={`col col-12 col-lg-5 h-100` }>
                    <h2>{`Phòng ở tại ${description}`}</h2>
                    {
                        isLoading? <Spinner animation='border' /> :
                        results.total === 0? <p>Không tìm thấy kết quả nào</p> :
                        results.rooms.map(room => {
                        return (
                            <div key={room.room_id} className="mb-4 pt-4 border-top border-1" >
                                <RoomCard room={room} onClick={() => {handleClick(room.room_id)}} canFavorite={userState != null} isFavorite={favoriteList.includes(room.room_id)}/>
                            </div>
                        )
                    })}
                </div>
                <div className={`col ${!showMap && "d-none "} d-lg-block col-lg-7 h-100 position-fixed bottom-0 end-0 div-map p-0`}>
                    {
                        location &&
                        <Map 
                            {...location}
                            results={results} 
                            handleClickPopup={handleClick}
                        />
                    }
                </div>
                    <Button variant="dark" className="d-block d-lg-none float-button" onClick={toggleShowMap}>
                        {buttonContent}
                        {buttonContent === "Hiện bản đồ"? 
                            <span className="bi bi-map-fill ms-1" /> :
                            <span className="bi bi-list-ul ms-1" />
                        }
                    </Button>
            </div>
            }
        </Layout>
    )
}

export default SearchResultPage;