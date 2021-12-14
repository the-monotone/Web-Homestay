import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Row, Col, Button, Container, Table} from 'react-bootstrap'
import { WePagination } from '../components/shared/wePagnigation';
import { WeToast } from '../components/shared/weToast';
import { WEB_API } from '../config';
import { Formik, Form } from 'formik';
import { TextField } from '../components/forms/TextField';
import * as Yup from 'yup'


export const RoomRow = ({room, isLoading, setLoading, removeRoom, setToast}) => {

    const userState = JSON.parse(localStorage.getItem('user-state'));

    const handleDeleteRoom = (e) => {
        if(isLoading) return;
        console.log(e.target);

    }
    const handleConfirmRoom = (e) => {

    }

    return(
        <tr>
            <td>{room.room_id}</td>
            <td>{room.host_id}</td>
            <td>{room.room_name}</td>
            <td>{room.confirmed ? 'CONFIRMED' : 'UNCONFIRMED'}</td>
            <td className='text-center'>
                <Button variant='success' onClick={handleConfirmRoom} id={room.room_id} disabled={room.confirmed}>Confirm</Button>
            </td>
            <td className='text-center'><Button variant='danger' onClick={handleDeleteRoom} id={room.room_id}>Delete</Button></td>
        </tr>
    )
}

export const RoomTab = () => {
    const [isLoading, setLoading] = useState(false);


    const [rooms, setRooms] = useState([]);
    const userState = JSON.parse(localStorage.getItem('user-state'));

    const [usersPerPage] = useState(8);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRoom, setTotalRoom] = useState(0);

    const [isDeleteToast, setDeleteToast] = useState(false);
    const [isConfirmToast, setConfirmToast] = useState(false);

    const [isViewAll, setViewAll] = useState(true);
    const [dataChange, setDataChange] = useState(true);
    const [filterRoom,  setFilterRoom] = useState({});


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
        await axios.get(`${WEB_API}/api/room?limit=${usersPerPage}&page=${currentPage}`, {
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

    const handleFilterRoom = async () => {
        console.log('filter called');
        console.log(filterRoom);
        if (!filterRoom || !(filterRoom.name || filterRoom.phone || filterRoom.email)) return;
        const clone = rooms.filter(room => !room.confirmed);
        setRooms([...clone])
        setTotalRoom(clone.length);
    }

    useEffect(() => {
        if(isLoading) return;
        isViewAll ? getAllRoom() : handleFilterRoom(filterRoom);
    },[dataChange, isViewAll])

    const handleSubmit = (value) => {
        setCurrentPage(1);
        setFilterRoom(value);
        setViewAll(false);
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
                    latitude: '',
                    longitude: ''
                }}
                validationSchema={validate}
                onSubmit = {handleSubmit}
            >
                {formik => (
                    <Form>
                        <Row className='w-100 d-flex justify-content-center'>
                            <Col><Button variant='success' onClick={handleGetAll} type='reset'>All</Button></Col>
                            <Col md = '4'><TextField placeholder="Room Id" name="room_id" type="text" errStyle={{color: 'white'}}/></Col>
                            <Col md = '3'><TextField placeholder="Host Id" name="host_id" type="text" errStyle={{color: 'white'}}/></Col>
                            <Col md= '1'><Button variant='warning' type="submit">Filter</Button></Col>
                        </Row>
                    </Form> 
                )}
            </Formik>

            <Container>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr className='text-center'>
                            <th>Room Id</th>
                            <th>Host Id</th>
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
                            setToast={setDeleteToast}/>
                        ))}
                    </tbody>
                </Table>
                <WePagination
                    total = {totalRoom}  
                    currentPage = {currentPage} 
                    itemPerPage = {usersPerPage} 
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