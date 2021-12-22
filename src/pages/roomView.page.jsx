/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Carousel, ListGroup, ListGroupItem, Spinner } from 'react-bootstrap';
import { FavoriteIcon } from '../components/shared/favorite.icon';
import BillingCard from '../components/card/BillingCard';
import FeedbackCard from '../components/card/FeedbackCard';
import Layout from '../components/layout.component';
import { RoomContext } from '../context/roomContext';
import { FeedbackContext } from '../context/feedbackContext';
import StarRatings from 'react-star-ratings';
import './roomView.page.css';

const RoomViewPage = () => {
    const {readRoom, roomFacility, getRentalDateByRoom, roomInit} = useContext(RoomContext);
    const {getFeedback, getFavorite} = useContext(FeedbackContext);
    const [room, setRoom] = useState(null);
    const [feedback, setFeedback] = useState(null);
    const [rentalDate, setRentalDate] = useState(null);
    const [isFavorite, setFavorite] = useState(null);
    const { roomId } = useParams();
    const userState = JSON.parse(localStorage.getItem("user-state"));

    useEffect(() => {
        let isActive = true;
        readRoom(roomId)
            .then(res => {
                console.log(res);
                if (isActive) setRoom(res);
                if (!userState) return;
                getFeedback(res.room_id, userState.token)
                    .then(res1 => {
                        if (isActive) setFeedback(res1);
                    })
                    .catch(err => {
                        alert(err);
                    })
                getFavorite(userState.token)
                    .then(res2 => {
                        if (isActive) {
                            setFavorite(res2.includes(res.room_id)); 
                        }
                    })
                    .catch(err => {
                        alert(err);
                    })
            })
            .catch(err => {
                alert(err);
            });

        getRentalDateByRoom(roomId)
            .then(res => {
                console.log(res);
                if (isActive) setRentalDate(res);
            })
            .catch(err => {
                alert(err);
            })
        
        return () => {
            isActive = false;
        }
    }, [])  

    const getFacility = (id) => {
        for (let i = 0; i < roomFacility.length; i++) {
            if (roomFacility[i].id === id) {
                return roomFacility[i].facility;
            }
        }
    }

    console.log(roomFacility);
    return (
        room == null? 
        <Layout>
            <Spinner animation="border" />
        </Layout> :
        <Layout>
            <div className="mt-5">
                <h2 className='room-name'>{room.room_name}</h2>
                <div className="d-flex justify-content-between">     
                {
                    room.rate !== null ? parseFloat(room.rate).toFixed(1) !== 0.0 ? 
                    <div className="d-flex align-items-end mb-1">
                        <div className='d-flex justify-content-center'>
                        <StarRatings
                            numberOfStars={5} 
                            rating={parseFloat(room.rate)}
                            starDimension='20px'
                            starRatedColor='rgb(230, 67, 47)'
                        />
                        </div>
                        <div className="ms-2 me-2 voting-num">{`${parseFloat(room.rate).toFixed(1)}`}</div>
                    </div>
                    : "Chưa có đánh giá"  : "Chưa có đánh giá"
                }
                {
                    userState && isFavorite != null &&  
                    <div className="d-flex align-items-center">
                        <strong>Lưu</strong>
                        <FavoriteIcon roomId={room.room_id} active={isFavorite} />
                    </div>
                }
                </div>
                <Carousel 
                    fade
                    className="carousel-room gray-border round-radius shadow mb-5"
                    variant='dark'
                    prevIcon={<i aria-hidden="true" className="bi bi-arrow-left-circle-fill " />}
                    nextIcon={<i aria-hidden="true" className="bi bi-arrow-right-circle-fill " />}
                >
                    {room.images.map((imageItem, index) => (
                        <Carousel.Item key={index} className="d-flex justify-content-center" >
                            <img src={imageItem} alt={`Slide ${index}`}/>
                        </Carousel.Item>
                    ))}
                </Carousel>
                <div className="billing">
                    {
                        rentalDate != null && 
                        <BillingCard 
                            price={room.price} 
                            rating={room.rate} 
                            roomId={roomId} 
                            hostId={room.host_id}
                            rentalDateList={rentalDate}
                        />
                    }     
                </div>
                <div className="fs-6 fw-bold">
                    {`${room.num_guest} khách`}
                    <i className="bi bi-dot"></i>
                    {`${room.num_bed} giường`}
                    <i className="bi bi-dot"></i>
                    {`${room.num_bedroom} phòng ngủ`}
                    <i className="bi bi-dot"></i>
                    {`${room.num_bathroom} phòng tắm`}
                </div>
                <hr />
                <div className="facility m-1">
                    <h3>Tiện nghi</h3>
                    <ListGroup>
                        {roomFacility ? room.facilities.length !== 0? 
                        room.facilities.map((facilityId) => {
                            return <ListGroupItem key={facilityId}>{getFacility(facilityId)}</ListGroupItem>
                        }) : <p>Danh sách tiện nghi trống</p> : <Spinner animation='border' />}
                    </ListGroup>
                </div>
                <hr />
                <div className="rule m-1">
                    <h3>Quy định chung</h3>
                    <ListGroup>
                        {
                            room.rule.split(";").map((ruleItem, index) => {
                                ruleItem.trim();
                                return <ListGroupItem key={index}>{ruleItem}</ListGroupItem>
                            })
                        }
                    </ListGroup>
                </div>
                <hr />
                <div id="feedback" className="m-1">
                    <h3>Đánh giá</h3>
                    {userState === null? <p>Đăng nhập để xem đánh giá</p> : feedback === null? 
                        <Spinner animation="border" /> :
                        feedback.total === 0? <p>Chưa có đánh giá nào</p> :
                    <ListGroup className="row">
                        {feedback.feedbacks.map(feedbackItem => 
                            <div className="col-12 col-md-7" key={feedbackItem.id}>
                                <FeedbackCard feedback={feedbackItem} />
                            </div>
                        )}
                    </ListGroup>
                    }
                </div>
                <hr />
            </div>
        </Layout>
    )
}

export default RoomViewPage;