import React, { useContext, useState }  from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Col, Row } from 'react-bootstrap';
import { FacilityBadgeList } from '../forms/FacilityBadgeList';
import { MyButton } from '../shared/myButton';
import './roomCard.css';
import { RoomContext } from '../../context/roomContext';
import { WeToast } from '../shared/weToast';
import { FavoriteIcon } from '../shared/favorite.icon';
import { useSpring, animated } from 'react-spring';

const displayMoney = (amount) => {
    var formatter = new Intl.NumberFormat('vi', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0,
    });
    return formatter.format(amount);
}

export const RoomCard = ({onClick, isEditable, room, canFavorite, isFavorite}) => {
    const {deleteRoom} = useContext(RoomContext);
    const userState = JSON.parse(localStorage.getItem('user-state'));
    const [isToast, setToast] = useState(false);
    const [onHover, setHover] = useState(false);

    const editBtnStyles = useSpring({
        config: {duration: 200},
        from: {
            transform: onHover ? 'translateX(0px) translateY(0px)' : 'translateX(0px) translateY(-25px)',
            scale : onHover ? 0 : 1,
            opacity: onHover ? 0 : 1
        },
        to: {
            transform: !onHover ? 'translateX(0px) translateY(0px)' : 'translateX(0px) translateY(-25px)',
            scale : !onHover ? 0 : 1,
            opacity: !onHover ? 0 : 1
        }
    })

    const removeBtnStyles = useSpring({
        config: {duration: 200},
        from: {
            transform: onHover ? 'translateX(0px) translateY(0px)' : 'translateX(20px) translateY(0px)',
            scale : onHover ? 0 : 1,
            opacity: onHover ? 0 : 1
        },
        to: {
            transform: !onHover ? 'translateX(0px) translateY(0px)' : 'translateX(20px) translateY(0px)',
            scale : !onHover ? 0 : 1,
            opacity: !onHover ? 0 : 1
        }
    })

    return(
            <div className="my-card"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                <Row className="g-0 row-body">
                    <Col sm="12" md="4">
                        <Carousel 
                            fade 
                            variant="dark"
                            prevIcon={<span aria-hidden="true" className="bi bi-arrow-left-circle-fill" />}
                            nextIcon={<span aria-hidden="true" className="bi bi-arrow-right-circle-fill" />}
                        >
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
                        <div>
                            <Row>
                                <Col sm='10' className='room-title fw-bolder fs-5 overflow-hidden' onClick={onClick}>{room.room_name}</Col>
                                <Col sm='2'>
                                    {canFavorite && <FavoriteIcon active={isFavorite} roomId={room.room_id}/>}
                                </Col>
                            </Row>
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
                                <strong>{displayMoney(parseFloat(room.price))}</strong>{"/đêm"}
                            </div>
                        </div>
                        
                    </Col>

                </Row>
                { isEditable &&
                            <div className="room-edit-option">
                                <animated.div
                                    style={{...editBtnStyles}}
                                >
                                    <Link to="/host/roomsignup" state={{stateRoom: room}}>
                                        <MyButton classNam = "edit-card-button">
                                            <span className='bi bi-gear'></span>    
                                        </MyButton>
                                    </Link>
                                </animated.div>
                                <animated.div
                                    style={{...removeBtnStyles}}
                                >
                                    <div onClick={() => {
                                        deleteRoom(userState.token, room.room_id)
                                            .then(res => {
                                                window.location.reload();
                                                setToast(true);
                                            })
                                            .catch(err => console.log(err))
                                    }}>
                                        <MyButton text="Xoá" classNam = "remove-card-button">
                                            <span className='bi bi-trash'></span>
                                        </MyButton>
                                    </div>
                                </animated.div>
                                
                            </div>
                        }
                <WeToast show={isToast} onClose={() => setToast(false)}/>
            </div>
    );
}