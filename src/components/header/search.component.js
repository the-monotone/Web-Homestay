import React, { useContext, useState } from 'react';
import DatePicker from 'react-datepicker';
import { Form, ListGroup, ListGroupItem, Modal} from 'react-bootstrap';
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
        <Modal show={show} onHide={onHide} dialogClassName="modal-80w">
            <Modal.Header closeButton>
                <Modal.Title>Tìm kiếm địa điểm</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form 
                    id="search-form" 
                    onSubmit={(event) => {handleSubmit(event)}} 
                    className="position-relative m-1 gray-border round-radius p-1 form-background"
                >
                    <div className="container">
                        <div className="row align-items-center">
                            <div 
                                onClick={() => setSearchPlace(state => !state)} 
                                className="fixed-height d-flex flex-column justify-content-between col-12 col-md-3 gray-border-right btn-place "
                            >
                                <strong>Địa điểm</strong>
                                <input
                                    type="text" 
                                    value={inputValue} 
                                    placeholder="Bạn muốn đi đâu?" 
                                    onChange={(e) => searchPlace(e.target.value)} 
                                    className="input-w100"
                                />
                            </div>
                            <div 
                                onClick={() => setSearchPlace(false)} 
                                className="fixed-height d-flex flex-column justify-content-between col-12 col-md-3 gray-border-right"
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
                                    className="input-w100"
                                    />
                            </div>
                            <div 
                                onClick={() => setSearchPlace(false)} 
                                className="fixed-height d-flex flex-column justify-content-between col-12 col-md-3 gray-border-right"
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
                                    className="input-w100"
                                    />
                            </div>
                            <div 
                                onClick={() => setSearchPlace(false)}
                                className="fixed-height d-flex flex-column justify-content-between col-12 col-md-3 btn-guest"
                            >
                                <strong>Khách</strong>
                                <GuestPicker guest={guest} changeGuest={changeGuest}/>
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
            </Modal.Body>
            <Modal.Footer>
                <label htmlFor="submit-button-search" className="btn btn-danger">Tìm kiếm</label>
            </Modal.Footer>
        </Modal>
    )
}

const PlacePicker = (props) => {
    return (
        <div id="search-place" className="gray-border round-radius shadow mt-1">  
            <h5>Địa điểm tìm kiếm</h5>
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
                className="text-center input-w100 input-h0"
            />
            <i className="bi bi-plus-circle-fill small-icon" onClick={increase}></i>
        </div>
    )
}


export default SearchModal;