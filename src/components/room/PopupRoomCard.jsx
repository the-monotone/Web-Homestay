import React from 'react';
import {Carousel} from 'react-bootstrap';
import './popupRoomCard.css';

const displayMoney = (amount) => {
    var formatter = new Intl.NumberFormat('vi', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0,
    });
    return formatter.format(amount);
  }

const PopupRoomCard = ({room, handleClick}) => {
    return (
        <div className="popup-room-card">
            <Carousel 
                fade 
                prevIcon={<div aria-hidden="true" className="bi bi-arrow-left-circle-fill" />}
                nextIcon={<div aria-hidden="true" className="bi bi-arrow-right-circle-fill" />}>
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
                <small>{room.rate !== null ? parseFloat(room.rate).toFixed(1) !== 0.0 ? parseFloat(room.rate).toFixed(1): "Chưa có đánh giá"  : "Chưa có đánh giá"}</small>
            </div>
            <strong className="d-block w-100 text-truncate" onClick={handleClick}>{room.room_name}</strong>
            <div>
                <small><strong>{displayMoney(parseFloat(room.price))}</strong>{"/đêm"}</small>
            </div>
        </div>
    )
}

export default PopupRoomCard;