import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import { RoomCard } from './roomCard'
import { useNavigate } from 'react-router-dom';
import { LoadingCardList } from '../shared/loadingCard';

export const RoomList = ({roomList, isEditable, isGetting}) => {
    
    const navigate = useNavigate();
    const handleView = (room) => {
        navigate(`/room/${room.room_id}`);
    }

    return(
        <Container className="roomlist-container mb-3 mt-5 ps-3 pe-3">{
        isGetting ? <LoadingCardList number={4}/> :
        <div>
        {
            roomList.length <= 0 ? <div className="no-room-text"><div className="bi bi-journal"></div>Hiện không có phòng nào</div> :
            <Row id="" xs={1} md={2}className="g-4 w-100 d-flex justify-content-around">
                {
                    roomList.map(room => {
                        return (
                            <Col key = {room.room_id} md='5' className=' border border-gray pt-2 pb-2'>
                                <RoomCard isEditable = {isEditable} room={room} onClick={() => handleView(room)}/>
                            </Col>
                        )})
                }
            </Row>
        }
        </div>
        }</Container>
    )
}