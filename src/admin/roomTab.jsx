/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import {Row, Col, Button, Container, Table, ListGroup, ListGroupItem, Form} from 'react-bootstrap'
import { WePagination } from '../components/shared/wePagnigation';
import { WeToast } from '../components/shared/weToast';
import { WEB_API } from '../config';
import { Formik, Form as FomikForm, useField,ErrorMessage } from 'formik';
import { TextField } from '../components/forms/TextField';
import * as Yup from 'yup'
import { SearchContext } from '../context/searchContext';
import { autocompleteApi, placeDetailApi } from '../api/goong.api';
import './admin.page.css'
import { MAX_REQUEST } from '../reducer/actionTypes';
import { RoomContext } from '../context/roomContext';



const RoomRow = ({room, isLoading, setLoading, removeRoom, setDeleteToast, setConfirmToast}) => {

    const userState = JSON.parse(localStorage.getItem('user-state'));
    const {deleteRoom, updateRoom} = useContext(RoomContext);

    const handleDeleteRoom = async () => {
        if(isLoading) return;
        setLoading(true);
        await deleteRoom(userState.token, room.room_id)
            .then(res => {setDeleteToast(true)})
            .catch(err => alert('System error. Change later'))
        setLoading(false);

    }
    const handleConfirmRoom = async () => {
        if(isLoading) return;
        setLoading(true);
        await updateRoom(userState.token, {...room, confirmed: true})
            .then(res => {setConfirmToast(true)})
            .catch(err => alert('System error. Change later'))
        setLoading(false);
    }

    return(
        <tr>
            <td>{room.host_id}</td>
            <td>{room.room_id}</td>
            <td>{room.room_name}</td>
            <td>{room.confirmed ? 'CONFIRMED' : 'UNCONFIRMED'}</td>
            <td className='text-center'>
                <Button variant='success' onClick={handleConfirmRoom} id={room.room_id} disabled={room.confirmed}>Confirm</Button>
            </td>
            <td className='text-center'><Button variant='danger' onClick={handleDeleteRoom} id={room.room_id}>Delete</Button></td>
        </tr>
    )
}

export const SearchPlaceInput = ({label, errStyle,setPosition , ...props}) => {
    const [isSearchPlace, setSearchPlace] = useState(false);
    const [predictions, setPredictions] = useState([]);
    const { changePlace } = useContext(SearchContext);
    const [field, meta, helper] = useField(props);

    const searchPlace = (input) => {
        autocompleteApi(input, (result) => {
        setPredictions(result.data.predictions);
        }, (err) => {
            console.error(err);
        })
    }

    const setSelectedPlace = (place_item) => {
        helper.setValue(place_item.description);
        placeDetailApi(place_item.place_id, (result) => {
            const location = result.data.results[0].geometry.location;
            changePlace({description: place_item.description, lat: location.lat, lng: location.lng});
            setPosition(location);
        }, (err) => {
            console.error(err);
        })
    }

    useEffect(() => {
        searchPlace(field.value)
    },[field.value])

    return(
        <Form.Group 
            className={`btn-place ${props.pos ?  props.pos : "mb-3"}`} 
            onClick={() => setSearchPlace(state => !state)} 
        >
            {label && <Form.Label>{label}</Form.Label>}
            <Form.Control 
                className={`input-w100 form-control shadow-none ${meta.touched && meta.error && 'is-invalid'}`}
                {...field}
                {...props}
                as='input'
                autoComplete="off"
            />
            {
                isSearchPlace && 
                <PlacePicker 
                    predictions={predictions} 
                    setSelectedPlace={setSelectedPlace} 
                />
            }
            <ErrorMessage name={field.name} component='div' style={!errStyle ? {color:'red'} : errStyle}/>
        </Form.Group>

    )
}

const PlacePicker = (props) => {
    return (
        <div id="search-place-2" className="gray-border round-radius shadow mt-1">  
            <h6 className='text-white ms-3 pt-2 pe-3'>Địa điểm tìm kiếm</h6>
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

export const RoomTab = () => {
    const [isLoading, setLoading] = useState(false);

    const [rooms, setRooms] = useState([]);
    const userState = JSON.parse(localStorage.getItem('user-state'));

    const [roomsPerPage] = useState(8);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRoom, setTotalRoom] = useState(0);

    const [isDeleteToast, setDeleteToast] = useState(false);
    const [isConfirmToast, setConfirmToast] = useState(false);

    const [isViewAll, setViewAll] = useState(true);
    const [dataChange, setDataChange] = useState(true);
    const [filterRoom,  setFilterRoom] = useState({});
    const [filterRoomsStore, setFilterRoomsStore] = useState([]);

    const [location, setLocation] = useState({});

    const handlePageNumber = (number) => {
        setCurrentPage(number);
        setDataChange(!dataChange);
    }

    const handleGetAll = () => {
        setCurrentPage(1);
        setViewAll(true);
        setDataChange(!dataChange);
    }

    const removeRoom = (id) => {
        const clone = rooms.filter(room => room.room_id !== id);
        setRooms([...clone]);
    }
    const getAllRoom = async () => {
        setLoading(true);
        await axios.get(`${WEB_API}/api/room?limit=${roomsPerPage}&page=${currentPage}`, {
            headers: {
                "Authorization": `Bearer ${userState.token}`
            }
        })
            .then(res => {
                setRooms([...res.data.rooms]);
                setTotalRoom(res.data.total);
                
            })
            .catch(err => {
                console.log(err);
            })
        setLoading(false);
    }

    const getAllRoomWithFilter = () => {
        return axios.get(`${WEB_API}/api/room?limit=${MAX_REQUEST}`, {
            headers: {
                "Authorization": `Bearer ${userState.token}`
            }
        })
            .then(res => {
                const clone = res.data.rooms.filter(room => !room.confirmed);
                return clone;
            })
            .catch(err => {
                console.log(err.response);
                throw(err);
            })
    }

    const getRoomsByPosition = () => {
        const body = {
            latitude: location.lat,
            longitude: location.lng
        }
        return axios.post(`${WEB_API}/api/room/search?limit=${MAX_REQUEST}`, body)
            .then(res => {
                console.log(res);
                const clone = res.data.rooms.filter(room => !room.confirmed);
                console.log(clone);
                return clone;
            })
            .catch(err => console.log(err))
    }

    const handleFilterRoom = async () => {
        console.log('filter called');
        console.log(filterRoom);
        const doIt = filterRoom.position ? getRoomsByPosition : getAllRoomWithFilter;
        setLoading(true);
        await doIt()
            .then((res) => {
                const setting = new Promise((
                    resolve => {
                        resolve()
                    }
                ));
                setting
                    .then(()=> {
                        if (filterRoom.host_id) {
                            const filterByHostId = res.filter(room => room.host_id === parseInt(filterRoom.host_id));
                            return filterByHostId;
                        } else return res;
                    })
                    .then(filterByHostId=>{
                        if (filterRoom.room_id) {
                            const filterByRoomId = filterByHostId.filter(room => room.room_id === parseInt(filterRoom.room_id));
                            return filterByRoomId;
                        } else return filterByHostId 
                    })
                    .then(result => {
                        const tempRooms = [...result];
                        setRooms([...(tempRooms.splice((currentPage-1)*roomsPerPage, roomsPerPage))]);
                        setTotalRoom(result.length);
                    });        
            })
            .catch(err => {
                console.log(err);
            })
        setLoading(false);
    }

    useEffect(() => {
        if(isLoading) return;
        isViewAll ? getAllRoom() : handleFilterRoom();
    },[dataChange, isViewAll, isDeleteToast, isConfirmToast])

    const handleSubmit = async (value) => {
        await setCurrentPage(1);
        await setFilterRoom({
            ...value,
            position: value.position ? location : null
        });
        await setViewAll(false);
        setDataChange(!dataChange);
    }

    const validate = Yup.object({
        room_id: Yup.number()
            .typeError("Must be number")
            .positive("Must be positive")
            .integer("Must be number"),
        host_id: Yup.number()
            .typeError("Must be number")
            .positive("Must be positive")
            .integer("Must be number")
    })
    return(
        <Container className='mt-3'>
            <Formik
                initialValues={{
                    room_id: '',
                    host_id: '',
                    position: ''
                }}
                validationSchema={validate}
                onSubmit = {handleSubmit}
            >
                {formik => (
                    <FomikForm> 
                        <Row className='w-100 d-flex justify-content-center'>
                            <Col><Button variant='success' onClick={handleGetAll} type='reset' disabled={isLoading}>All</Button></Col>
                            <Col md='4'><SearchPlaceInput placeholder="Place" name='position' type="text" errStyle={{color: 'white'}} setPosition={setLocation}/></Col>
                            <Col md = '3'><TextField placeholder="Host Id" name="host_id" type="text" errStyle={{color: 'white'}}/></Col>
                            <Col md = '3'><TextField placeholder="Room Id" name="room_id" type="text" errStyle={{color: 'white'}}/></Col>
                            <Col md= '1'><Button variant='warning' type="submit"  disabled={isLoading}>Filter</Button></Col>
                        </Row>
                    </FomikForm> 
                )}
            </Formik>

            <Container>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr className='text-center'>
                            <th>Host Id</th>
                            <th>Room Id</th>
                            <th>Room Name</th>
                            <th>Status</th>
                            <th style={{width:'10%'}}></th>
                            <th style={{width:'10%'}}></th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        rooms.map(room => (
                        <RoomRow 
                            key = {room.room_id} 
                            room = {room} 
                            isLoading={isLoading} 
                            setLoading={setLoading}
                            removeUser={removeRoom}
                            setDeleteToast={setDeleteToast}
                            setConfirmToast={setConfirmToast}/>
                        ))}
                    </tbody>
                </Table>
                <WePagination
                    total = {totalRoom}  
                    currentPage = {currentPage} 
                    itemPerPage = {roomsPerPage} 
                    setCurrentPage = {handlePageNumber}
                    isGetting = {isLoading}
                />
                <WeToast
                    show={isDeleteToast}
                    onClose={() => setDeleteToast(false)}
                >
                    Delete Success
                </WeToast>
                <WeToast
                    show={isConfirmToast}
                    onClose={()=>setConfirmToast(false)}
                >
                    Confirm Success
                </WeToast>
            </Container>
        </Container>
    )
}