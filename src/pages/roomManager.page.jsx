import React, { useEffect } from 'react';
import { useContext } from 'react';
import { RoomCard } from '../components/forms/RoomCard';
import { Row, Col, Button, Container } from 'react-bootstrap'
import { ManagerRoomContext } from '../context/managerRoomContext';
import { GET_ROOM } from '../reducer/actionTypes';
import { Link } from 'react-router-dom';
import './roomManager.css';

export const RoomManager = () => {

    const {roomList, dispatch} = useContext(ManagerRoomContext);
   
    useEffect(() => {
        dispatch({
            type: GET_ROOM,
            payload: null
        })
    },[])

    console.log(roomList);

    return (
        
        <Container className="roomlist-container mb-3">
            {
            roomList.length <= 0 ? <p>Bạn không có khách nào hiện đang ở chỗ của bạn</p> :
            <Row id="room-list-block" xs={1} md={2} xl= {3} className="g-4">
                {
                    roomList.map(room => {
                        return (
<<<<<<< HEAD
                            <Col key = {room.id} id="my-card">
                                <RoomCard isEditable room={room}/>
=======
                            <Col key = {room.id}>
                                <RoomCard room={room}/>
>>>>>>> 8b42ab205b0cc2ffc8dcc7c7e7aa3dfece06e39b
                            </Col>
                        )})
                }
            </Row>
            }
            <Link to="/roomsignup">
                <Button variant="outline-success" className="add-room-signup mt-3">Đăng ký thêm</Button>
            </Link>

        </Container>
    )
}