import React, { useContext }  from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Badge, Carousel, Col, Row } from 'react-bootstrap';
import { Card, Button } from 'react-bootstrap';
import { FacilityBadgeList } from './FacilityBadgeList';
import { MyButton } from '../shared/myButton';
import './roomCard.css';
import { ManagerRoomContext } from '../../context/managerRoomContext';
import { DELETE_ROOM } from '../../reducer/actionTypes';


export const RoomCard = ({room}) => {

    const {dispatch} = useContext(ManagerRoomContext);

    return(
            <Card md="6" className="my-card">
                <Row className="g-0">
                    <Col md="4">
                        <Carousel fade>
                        {
                            room.image.map((imageSrc, index) => {
                                return(
                                    <Carousel.Item key = {index}>
                                        <img
                                        className="d-block w-100"
                                        src={imageSrc}
                                        alt={`Slide ${index}`}
                                        />
                                    </Carousel.Item>
                                )
                            })
                        }
                        </Carousel>
                    </Col>
                    <Col md="8">
                        <Card.Body>
                            <Card.Title>{room.name}</Card.Title>
                            <Badge pill>{`${room.num_guest} khách`}</Badge>{' '}
                            <Badge pill>{`${room.num_bed} giường`}</Badge>{' '}
                            <Badge pill>{`${room.num_bedroom} phòng tắm`}</Badge>{' '}
                            <FacilityBadgeList facList={room.room_facility} />
                            <div className="room-edit-option">
                                <Link to="/roomedit" state={{room}}>
                                    <MyButton text="Chỉnh sửa" classNam = "edit-card-button"/>
                                </Link>
                                <div onClick={() => {
                                    dispatch({
                                        type: DELETE_ROOM,
                                        payload: room.id
                                    })
                                }}>
                                    <MyButton text="Xoá" classNam = "remove-card-button"/>
                                </div>
                            </div>
                        </Card.Body>
                    </Col>
                </Row>

            </Card>
        
    );
}