import React, { useContext, useState, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { Form, ListGroup, ListGroupItem, Modal, Container} from 'react-bootstrap';
import { autocompleteApi, placeDetailApi } from '../../api/goong.api';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/searchContext';
import "react-datepicker/dist/react-datepicker.css";
import './search.css';

const SearchModal = ({show, onHide}) => {
    const [isSearchPlace, setSearchPlace] = useState(false);
    const [predictions, setPredictions] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const navigate = useNavigate();
    const 
        { 
            changePlace, 
            changeStartDate, 
            changeEndDate, 
            changeGuest,
            place,
            startDate,
            endDate,
            guest
        } = useContext(SearchContext);

    const searchPlace = (input) => {
        setInputValue(input);
        autocompleteApi(input, (result) => {
            setPredictions(result.data.predictions);
        }, (err) => {
            console.error(err);
        })
    }

    const setSelectedPlace = (place_item) => {
        setInputValue(place_item.description);
        placeDetailApi(place_item.place_id, (result) => {
            const location = result.data.results[0].geometry.location;
            changePlace({description: place_item.description, lat: location.lat, lng: location.lng});
        }, (err) => {
            console.error(err);
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onHide();
        const body = {
            latitude: place.lat,
            longitude: place.lng,
            radius: 10
        }
        console.log(JSON.stringify(body));
        localStorage.setItem("search-query", JSON.stringify(body));
        localStorage.setItem("place", JSON.stringify(place));
        navigate("/search", {state: body});
    }
    return (
        <Modal show={show} onHide={onHide} dialogClassName="modal-80w ">
            <Form 
                id="search-form" 
                onSubmit={(event) => {handleSubmit(event)}} 
                className="position-relative m-1 round-radius p-1 rounded-pill pe-1 ps-1"
            >
                <div className="container">
                    <div className="row align-items-center">
                        <div 
                            onClick={() => setSearchPlace(state => !state)} 
                            className="fixed-height d-flex flex-column justify-content-center col-12 col-md-3 gray-border-right btn-place "
                        >
                            <strong className='ms-1'>Địa điểm</strong>
                            <input
                                type="text" 
                                value={inputValue} 
                                placeholder="Bạn muốn đi đâu?" 
                                onChange={(e) => searchPlace(e.target.value)} 
                                className="input-w100 search-input"
                            />
                        </div>
                        <div 
                            onClick={() => setSearchPlace(false)} 
                            className="fixed-height d-flex flex-column justify-content-center col-12 col-md-3 gray-border-right"
                        >
                            <strong>Nhận phòng</strong>
                            <DatePicker 
                                selected={startDate} 
                                placeholderText="dd/MM/yyyy"
                                onChange={date => {changeStartDate(date)}} 
                                dateFormat="dd/MM/yyyy" 
                                minDate={new Date()} 
                                maxDate={endDate} 
                                monthsShown={2}
                                customInput={<input />}
                                className="input-w100 search-input"
                                />
                        </div>
                        <div 
                            onClick={() => setSearchPlace(false)} 
                            className="fixed-height d-flex flex-column justify-content-center col-12 col-md-3 gray-border-right"
                        >
                            <strong>Trả phòng</strong>
                            <DatePicker 
                                selected={endDate} 
                                placeholderText="dd/MM/yyyy"
                                onChange={date => {changeEndDate(date)}} 
                                dateFormat="dd/MM/yyyy" 
                                minDate={startDate == null? new Date() : startDate} 
                                monthsShown={2}
                                customInput={<input />}
                                className="input-w100 search-input"
                                />
                        </div>
                        <div 
                            onClick={() => setSearchPlace(false)}
                            className="fixed-height d-flex flex-column justify-content-center col-12 col-md-2 btn-guest"
                        >
                            <strong>Khách</strong>
                            <GuestPicker guest={guest} changeGuest={changeGuest}/>
                        </div>
                        <div
                            className="fixed-height d-flex flex-column justify-content-center col-12 col-md-1"
                        >
                            <label htmlFor="submit-button-search" className="btn btn-danger rounded-pill text-white"><i class="bi bi-search"></i></label>
                        </div>
                    </div>
                </div>
                {
                    isSearchPlace && 
                    <PlacePicker 
                        predictions={predictions} 
                        setSelectedPlace={setSelectedPlace} 
                    />
                }
                <input type="submit" id="submit-button-search" hidden />
            </Form>
        </Modal>
    )
}

const PlacePicker = (props) => {
    return (
        <div id="search-place" className="round-radius shadow mt-3">  
            <div className='ms-1 d-flex align-items-center fw-bold'>Địa điểm tìm kiếm</div>
            <ListGroup>
                {props.predictions.map(
                    item => 
                        <ListGroupItem key={item.place_id} onClick={() => {props.setSelectedPlace(item)}}>
                            {item.description}
                        </ListGroupItem>
                )}
            </ListGroup>
        </div>
    )
}

const GuestPicker = ({guest, changeGuest}) => {
    const increase = () => {
        changeGuest(guest + 1);
    }
    const decrease = () => {
        if (guest > 0) changeGuest(guest - 1);
    }
    return (
        <div className="d-flex align-items-center">
            <i className="bi bi-dash-circle-fill small-icon" onClick={decrease}></i>
            <input
                type="number"
                disabled
                autoComplete="off"
                placeholder="Thêm khách"
                value={guest}
                min="0"
                className="text-center input-w100 input-h0 search-input"
            />
            <i className="bi bi-plus-circle-fill small-icon" onClick={increase}></i>
        </div>
    )
}

export const OnlySearchBar = () => {
    const [isSearchPlace, setSearchPlace] = useState(false);
    const [predictions, setPredictions] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const navigate = useNavigate();
    const 
        { 
            changePlace, 
            changeStartDate, 
            changeEndDate, 
            changeGuest,
            place,
            startDate,
            endDate,
            guest
        } = useContext(SearchContext);

    const {setOnViewport} = useContext(SearchContext);



    const searchPlace = (input) => {
        setInputValue(input);
        autocompleteApi(input, (result) => {
            setPredictions(result.data.predictions);
        }, (err) => {
            console.error(err);
        })
    }

    const setSelectedPlace = (place_item) => {
        setInputValue(place_item.description);
        placeDetailApi(place_item.place_id, (result) => {
            const location = result.data.results[0].geometry.location;
            changePlace({description: place_item.description, lat: location.lat, lng: location.lng});
        }, (err) => {
            console.error(err);
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const body = {
            latitude: place.lat,
            longitude: place.lng,
            radius: 10
        }
        console.log(JSON.stringify(body));
        localStorage.setItem("search-query", JSON.stringify(body));
        localStorage.setItem("place", JSON.stringify(place));
        navigate("/search", {state: body});
    }


    return (
        <Container className=""
            onScroll={() => {console.log("???")}}
        >
            <Form 
                id="search-form" 
                onSubmit={(event) => {handleSubmit(event)}} 
                className="position-relative rounded-pill pe-2 ps-4"
            >
                <div className="container">
                    <div className="row align-items-center">
                        <div 
                            onClick={() => setSearchPlace(state => !state)} 
                            className="fixed-height d-flex flex-column justify-content-center col-12 col-md-3  btn-place pe-0"
                        >
                            <div className='w-100 gray-border-right'>
                                <strong className='ms-1 search-form-label'>Địa điểm</strong>
                                <input
                                    type="text" 
                                    value={inputValue} 
                                    placeholder="Bạn muốn đi đâu?" 
                                    onChange={(e) => searchPlace(e.target.value)} 
                                    className="input-w100 search-input"
                                />
                            </div>
                            
                        </div>
                        <div 
                            onClick={() => setSearchPlace(false)} 
                            className="fixed-height d-flex flex-column justify-content-center col-12 col-md-3"
                        >
                            <div className='w-100 gray-border-right'>
                                <strong className='ms-1 search-form-label'>Nhận phòng</strong>
                                    <DatePicker 
                                        selected={startDate} 
                                        placeholderText="dd/MM/yyyy"
                                        onChange={date => {changeStartDate(date)}} 
                                        dateFormat="dd/MM/yyyy" 
                                        minDate={new Date()} 
                                        maxDate={endDate} 
                                        monthsShown={2}
                                        customInput={<input />}
                                        className="input-w100 search-input"
                                        />
                                </div>
                            </div>
                        <div 
                            onClick={() => setSearchPlace(false)} 
                            className="fixed-height d-flex flex-column justify-content-center col-12 col-md-3"
                        >
                            <div className='w-100 gray-border-right'>
                            <strong className='ms-1 search-form-label'>Trả phòng</strong>
                                <DatePicker 
                                    selected={endDate} 
                                    placeholderText="dd/MM/yyyy"
                                    onChange={date => {changeEndDate(date)}} 
                                    dateFormat="dd/MM/yyyy" 
                                    minDate={startDate == null? new Date() : startDate} 
                                    monthsShown={2}
                                    customInput={<input />}
                                    className="input-w100 search-input"
                                    />
                            </div>
                        </div>
                        <div 
                            onClick={() => setSearchPlace(false)}
                            className="fixed-height d-flex flex-column justify-content-center col-12 col-md-2 btn-guest"
                        >
                            <strong className='ms-1 search-form-label'>Khách</strong>
                            <GuestPicker guest={guest} changeGuest={changeGuest}/>
                        </div>
                        <div
                            className="fixed-height d-flex flex-column justify-content-center col-12 col-md-1"
                        >
                            <label htmlFor="submit-button-search" className="btn btn-danger rounded-pill text-white search-btn-label text-center d-flex align-items-center justify-content-center pe-2 ps-2"><i className="bi bi-search"></i></label>
                        </div>
                    </div>
                </div>
                {
                    isSearchPlace && 
                    <PlacePicker 
                        predictions={predictions} 
                        setSelectedPlace={setSelectedPlace} 
                    />
                }
                <input type="submit" id="submit-button-search" hidden />
            </Form>
        </Container>
    )
}


export default SearchModal;