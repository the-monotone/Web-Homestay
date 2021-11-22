import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { Form, ListGroup, ListGroupItem, Modal} from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";
import './search.css';
import { autocompleteApi, placeDetailApi } from '../../api/goong.api';
import useSearch from '../../hook/useSearch';
import { useNavigate } from 'react-router-dom';

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
        } = useSearch();

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
            place,
            startDate,
            endDate,
            guest
        }
        console.log(JSON.stringify(body));
        navigate("/search");
    }
    return (
        <Modal show={show} onHide={onHide} size="lg">
            <Modal.Header closeButton>Tìm kiếm địa điểm</Modal.Header>
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
                                className="col-12 col-md-3 gray-border-right btn-place"
                            >
                                <strong>Địa điểm</strong>
                                <input
                                    type="text" 
                                    value={inputValue} 
                                    placeholder="Bạn muốn đi đâu?" 
                                    onChange={(e) => searchPlace(e.target.value)} 
                                    className="input"
                                />
                            </div>
                            <div onClick={() => setSearchPlace(false)} className="col-12 col-md-3 gray-border-right btn-start">
                                <strong>Nhận phòng</strong>
                                <DatePicker 
                                    selected={startDate} 
                                    onChange={date => {changeStartDate(date)}} 
                                    dateFormat="dd/MM/yyyy" 
                                    minDate={new Date()} 
                                    maxDate={endDate} 
                                    monthsShown={2}
                                    customInput={<input />}
                                    className="input"
                                    />
                            </div>
                            <div onClick={() => setSearchPlace(false)} className="col-12 col-md-3 gray-border-right btn-end">
                                <strong>Trả phòng</strong>
                                <DatePicker 
                                    selected={endDate} 
                                    onChange={date => {changeEndDate(date)}} 
                                    dateFormat="dd/MM/yyyy" 
                                    minDate={startDate == null? new Date() : startDate} 
                                    monthsShown={2}
                                    customInput={<input />}
                                    className="input"
                                    />
                            </div>
                            <div onClick={() => setSearchPlace(false)} className="col-12 col-md-3 btn-guest">
                                <strong>Khách</strong>
                                <input 
                                    type="number" 
                                    value={guest} 
                                    onChange={event => changeGuest(event.target.value)} 
                                    placeholder="Thêm khách"
                                    className="input"
                                />
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
                    <input type="submit" id="submit-button" hidden />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <label htmlFor="submit-button" className="btn btn-danger">Tìm kiếm</label>
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


export default SearchModal;