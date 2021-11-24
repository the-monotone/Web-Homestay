import React from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap';
import { RoomCard } from './RoomCard'
import { Link, useNavigate } from 'react-router-dom';


export const RoomList = ({roomList, isEditable}) => {
    
    const navigate = useNavigate();
    const handleView = (room) => {
        navigate(`/room/${room.id}`, {state: room} );
    }

    const handleEdit = (room) => {
        navigate(`/roomedit/${room.id}`, {state: room});
    }

    return(
        <Container className="roomlist-container mb-3 mt-5">
            {
            roomList.length <= 0 ? <p className="no-room-text">Bạn không có khách nào hiện đang ở chỗ của bạn</p> :
            <Row id="room-list-block" xs={1} md={2} xl= {3} className="g-4">
                {
                    roomList.map(room => {
                        return (
                            <Col key = {room.id} id="my-card">
                                <RoomCard isEditable = {isEditable} room={room} onClick={!isEditable ? () => handleView(room) : null}/>
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