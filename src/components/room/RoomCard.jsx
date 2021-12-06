import React, { useContext }  from 'react';
import { Link } from 'react-router-dom';
import { Badge, Carousel, Col, Row } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { FacilityBadgeList } from '../forms/FacilityBadgeList';
import { MyButton } from '../shared/myButton';
import './roomCard.css';
import { ManagerRoomContext } from '../../context/managerRoomContext';
import { DELETE_ROOM } from '../../reducer/actionTypes';


export const RoomCard = ({onClick, isEditable, room}) => {

    const {dispatch} = useContext(ManagerRoomContext);

    return(
            <Card md="6" className="my-card">
                <Row className="g-0 row-body">
                    <Col sm="12" md="4">
                        <Carousel fade variant="dark">
                        {
                            room.image.map((imageItem) => {
                                return(
                                    <Carousel.Item key={imageItem.image_id} className="h-100">
                                <img
                                className="carousel-img"
                                src={imageItem.url}
                                alt={`Slide ${imageItem.image_id}`}
                                />
                            </Carousel.Item>
                                )
                            })
                        }
                        </Carousel>
                    </Col>
                    <Col sm="12" md="8">
                        <Card.Body onClick={onClick}>
                            <Card.Title>{room.room_name}</Card.Title>
                            <Badge pill>{`${room.numGuest} khách`}</Badge>{' '}
                            <Badge pill>{`${room.numBed} giường`}</Badge>{' '}
                            <Badge pill>{`${room.numBedroom} phòng tắm`}</Badge>{' '}
                            {/* <FacilityBadgeList facList={room.room_facility} /> */}
                            { isEditable &&
                                <div className="room-edit-option">
                                    <Link to="/roomedit" state={{room}}>
                                        <MyButton text="Chỉnh sửa" classNam = "edit-card-button"/>
                                    </Link>
                                    <div onClick={() => {
                                        dispatch({
                                            type: DELETE_ROOM,
                                            payload: room.room_id
                                        })
                                    }}>
                                        <MyButton text="Xoá" classNam = "remove-card-button"/>
                                    </div>
                                </div>
                            }
                        </Card.Body>
                    </Col>
                </Row>
                <Card.Footer className="d-flex justify-content-between">
                    <div>
                        <i className="bi bi-star-fill small-icon"></i>
                        {room.rate != null? room.rate.toFixed(1) : "Chưa có đánh giá"}
                    </div>
                    <div>
                        <strong>{`${room.price}₫`}</strong>{"/đêm"}
                    </div>
                </Card.Footer>
            </Card>
    );
}