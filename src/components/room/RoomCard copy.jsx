import React, { useContext, useState }  from 'react';
import { Link } from 'react-router-dom';
import { Badge, Carousel, Col, Row } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { FacilityBadgeList } from '../forms/FacilityBadgeList';
import { MyButton } from '../shared/myButton';
import './roomCard.css';
import { RoomContext } from '../../context/roomContext';
import { WeToast } from '../shared/weToast';


export const RoomCardTest = ({onClick, isEditable, room}) => {
    const {deleteRoom} = useContext(RoomContext);
    const userState = JSON.parse(localStorage.getItem('user-state'));
    const [isToast, setToast] = useState(false);

    console.log((room));

    return(
            <div className="my-card">
                <Row className="g-0 row-body">
                    <Col sm="12" md="4">
                        <Carousel fade variant="dark">
                        {
                            room.images.map((imageItem, index) => {
                                return(
                                    <Carousel.Item key={index} className="h-100">
                                <img
                                className="carousel-img"
                                src={imageItem}
                                alt={`Slide ${index}`}
                                />
                            </Carousel.Item>
                                )
                            })
                        }
                        </Carousel>
                    </Col>
                    <Col sm="12" md="8" className='ps-3 pt-2 pb-2 pe-1 my-card-body h-100'>
                        <div onClick={onClick}>
                            <div className='room-title fw-bolder fs-5 overflow-hidden '>{room.room_name}</div>
                            <div className="fs-6 fw-light lh-sm kgnt">
                                {`${room.num_guest} khách`}
                                <i className="bi bi-dot"></i>
                                {`${room.num_bed} giường`}
                                <i className="bi bi-dot"></i>
                                {`${room.num_bedroom} phòng ngủ`}
                                <i className="bi bi-dot"></i>
                                {`${room.num_bathroom} phòng tắm`}
                            </div>
                            <FacilityBadgeList facList={room.facilities} />
                            
                        </div>
                        <div className="d-flex justify-content-between my-card-footer">
                            <div>
                                <i className="bi bi-star-fill small-icon"></i>
                                {room.rate !== null ? parseFloat(room.rate).toFixed(1) !== 0.0 ? parseFloat(room.rate).toFixed(1): "Chưa có đánh giá"  : "Chưa có đánh giá"}
                            </div>
                            <div>
                                <strong>{`${room.price}₫`}</strong>{"/đêm"}
                            </div>
                        </div>
                        { isEditable &&
                            <div className="room-edit-option">
                                <Link to="/host/roomsignup" state={{stateRoom: room}}>
                                    <MyButton text="Chỉnh sửa" classNam = "edit-card-button"/>
                                </Link>
                                <div onClick={() => {
                                    deleteRoom(userState.token, room.room_id)
                                        .then(res => {
                                            window.location.reload();
                                            setToast(true);
                                        })
                                        .catch(err => console.log(err))
                                }}>
                                    <MyButton text="Xoá" classNam = "remove-card-button"/>
                                </div>
                            </div>
                        }
                    </Col>
                </Row>
                <WeToast show={isToast} onClose={() => setToast(false)}/>
            </div>
    );
}