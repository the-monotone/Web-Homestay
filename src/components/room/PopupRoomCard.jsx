import React from 'react';
import {Carousel} from 'react-bootstrap';
import './popupRoomCard.css';

const PopupRoomCard = ({room}) => {
    return (
        <div className="popup-room-card">
            <Carousel fade variant="dark">
            {
                room.images.map((imageUrl, index) => {
                    return(
                        <Carousel.Item key={index} className="h-100">
                            <img
                            className="carousel-img"
                            src={imageUrl}
                            alt={`Slide ${index}`}
                            />
                        </Carousel.Item>
                    )
                })
            }
            </Carousel>
            <div>
                <i className="bi bi-star-fill small-icon"></i>
                <small>{room.rate != null? room.rate.toFixed(1) : "Chưa có đánh giá"}</small>
            </div>
            <strong className="d-block w-100 text-truncate">{room.room_name}</strong>
            <div>
                <small><strong>{`${room.price} VND`}</strong>{"/đêm"}</small>
            </div>
        </div>
    )
}

export default PopupRoomCard;