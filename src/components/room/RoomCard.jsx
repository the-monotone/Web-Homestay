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
                <Row className="g-0">
                    <Col md="4">
                        <Carousel>
                        {
                            room.image.map((imageSrc, index) => {
                                return(
                                    <Carousel.Item key = {index}>
                                        <img
                                        className="d-block w-100 carousel-img"
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
                        <Card.Body onClick={onClick}>
                            <Card.Title>{room.name}</Card.Title>
                            <Badge pill>{`${room.num_guest} khách`}</Badge>{' '}
                            <Badge pill>{`${room.num_bed} giường`}</Badge>{' '}
                            <Badge pill>{`${room.num_bedroom} phòng tắm`}</Badge>{' '}
                            <FacilityBadgeList facList={room.room_facility} />
                            { isEditable &&
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
                            }
                        </Card.Body>
                    </Col>
                </Row>

            </Card>
        
    );
}