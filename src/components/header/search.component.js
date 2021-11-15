import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { Form, Input, ListGroup, ListGroupItem, Button} from 'reactstrap';
import "react-datepicker/dist/react-datepicker.css";
import './search.css';
import { autocompleteApi, placeDetailApi } from '../../api/goong.api';
import useSearch from '../../hook/useSearch';

const SearchForm = () => {
    const initialButton = {
        place: false,
        start: false,
        end: false,
        guest: false
    }
    const [showButton, setShowButton] = useState(initialButton);

    const [predictions, setPredictions] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const 
        { 
            changePlace, 
            changeStartDate, 
            changeEndDate, 
            changeAdultGuest, 
            changeChildGuest,
            changeBabyGuest,
            place,
            startDate,
            endDate,
            guest
        } = useSearch();

    const toggleButton = (obj) => {
        const newShowButton = {...initialButton, ...obj};
        setShowButton(newShowButton);
    }

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

    const isChangedGuest = guest.adult !== 0 || guest.child !== 0 || guest.baby !== 0;
    const stringifyGuest = (guest) => {
        return `${guest.adult} người lớn, ${guest.child} trẻ em, ${guest.baby} trẻ sơ sinh`;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const body = {
            place,
            startDate,
            endDate,
            guest
        }
        console.log(JSON.stringify(body));
    }
    return (
        <Form onSubmit={(event) => {handleSubmit(event)}} className="position-relative m-1 gray-border round-radius p-1 form-background">
            <div className="container">
                <div className="row">
                    <div onClick={() => toggleButton({place: true})} className="col-12 col-md-3 gray-border-right btn-place">
                        <strong>Địa điểm</strong>
                        <Input type="text" value={inputValue} placeholder="Bạn muốn đi đâu?" onChange={(e) => searchPlace(e.target.value)} />
                    </div>
                    <div onClick={() => toggleButton({start: true})} className="col-12 col-md-3 gray-border-right btn-start">
                        <strong>Nhận phòng</strong>
                        <DatePicker 
                            selected={startDate} 
                            onChange={date => {changeStartDate(date)}} 
                            dateFormat="dd/MM/yyyy" 
                            minDate={new Date()} 
                            maxDate={endDate} 
                            monthsShown={2}
                            customInput={<Input />}
                            className="input"
                            />
                    </div>
                    <div onClick={() => toggleButton({end: true})} className="col-12 col-md-3 gray-border-right btn-end">
                        <strong>Trả phòng</strong>
                        <DatePicker 
                            selected={endDate} 
                            onChange={date => {changeEndDate(date)}} 
                            dateFormat="dd/MM/yyyy" 
                            minDate={startDate == null? new Date() : startDate} 
                            monthsShown={2}
                            customInput={<Input />}
                            className="input"
                            
                            />
                    </div>
                    <div onClick={() => toggleButton({guest: true})} className="col-12 col-md-3 btn-guest">
                        <strong>Khách</strong>
                        <div>{isChangedGuest? stringifyGuest(guest) : "Thêm khách"}</div>
                    </div>
                    <div className="row mt-1 justify-content-end">
                        <Button className="col-12 col-md-2" color="danger" type="submit">Tìm kiếm</Button>
                    </div>
                </div>
            </div>
            {
                showButton.place && 
                <PlacePicker 
                    predictions={predictions} 
                    setSelectedPlace={setSelectedPlace} 
                />
            }
            {
                showButton.guest && 
                <GuestPicker 
                    guest={guest}
                    changeAdultGuest={changeAdultGuest}
                    changeChildGuest={changeChildGuest}
                    changeBabyGuest={changeBabyGuest} 
                />
            }
        </Form>
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

const GuestPicker = (props) => {
    return (
        <div id="select-guest" className="gray-border round-radius shadow mt-1 container">
            <div className="row">
                <label htmlFor="adult" className="col-7">Người lớn</label>
                <input 
                    type="number" 
                    id="adult" 
                    className="col-4" 
                    min={0} 
                    // value={props.guest.adult}
                    defaultValue={0} 
                    onChange={event => {props.changeAdultGuest(event.target.value);}}
                />
            </div>
            <div className="row">
                <label htmlFor="child" className="col-7">Trẻ em</label>
                <input 
                    type="number" 
                    id="child" 
                    className="col-4" 
                    min={0} 
                    // value={props.guest.child}
                    defaultValue={0} 
                    onChange={event => {props.changeChildGuest(event.target.value)}}
                />
            </div>
            <div className="row">
                <label htmlFor="baby" className="col-7">Trẻ sơ sinh</label>
                <input 
                    type="number" 
                    id="baby" 
                    className="col-4" 
                    min={0} 
                    // value={props.guest.baby}
                    defaultValue={0} 
                    onChange={event => {props.changeBabyGuest(event.target.value)}}
                />
            </div>
        </div>
    );
}

export default SearchForm;