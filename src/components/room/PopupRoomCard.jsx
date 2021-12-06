import React from 'react';
import {Carousel} from 'react-bootstrap';
import './popupRoomCard.css';

const PopupRoomCard = ({room}) => {
    return (
        <div className="popup-room-card">
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