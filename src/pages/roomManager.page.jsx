import React, { useEffect } from 'react';
import { useContext } from 'react';
import { RoomCard } from '../components/forms/RoomCard';
import { Row, Col, Button } from 'react-bootstrap'
import { ManagerRoomContext } from '../context/managerRoomContext';
import { GET_ROOM } from '../reducer/actionTypes';
import { Link } from 'react-router-dom';

export const RoomManager = () => {

    const {roomList, dispatch} = useContext(ManagerRoomContext);
   
    useEffect(() => {
        dispatch({
            type: GET_ROOM,
            payload: null
        })
    },[])

    return (
        <Row>
            <Row id="room-list-block" xs={1} md={2} className="g-4">
                {
                    roomList.map(room => {
                        return (
                            <Col key = {room.id} id="my-card">
                                <RoomCard room={room}/>
                            </Col>
                        )})
                }
            </Row>
            <Link to="/roomsignup">
                <Button variant="outline-success" className="add-room-signup mt-3">Đăng ký thêm</Button>
            </Link>

        </Row>
    )
}