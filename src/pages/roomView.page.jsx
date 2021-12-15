/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Carousel, Badge, ListGroup, ListGroupItem, Spinner } from 'react-bootstrap';
import { FavoriteIcon } from '../components/shared/favorite.icon';
import BillingCard from '../components/card/BillingCard';
import FeedbackCard from '../components/card/FeedbackCard';
import Layout from '../components/layout.component';
import { RoomContext } from '../context/roomContext';
import { FeedbackContext } from '../context/feedbackContext';
import './roomView.page.css';
import StarRatings from 'react-star-ratings';

const RoomViewPage = () => {
    const {readRoom, roomFacility} = useContext(RoomContext);
    const {getFeedback, getFavorite} = useContext(FeedbackContext);
    const [room, setRoom] = useState(null);
    const [feedback, setFeedback] = useState(null);
    const [isFavorite, setFavorite] = useState(null);
    const { roomId } = useParams();
    const userState = JSON.parse(localStorage.getItem("user-state"));
    useEffect(() => {
        let isActive = true;
        readRoom(roomId)
            .then(res => {
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
                        console.log(res2);
                        console.log(res.room_id);
                        if (isActive) {
                            console.log(res2.includes(res.room_id));
                            setFavorite(res2.includes(res.room_id)); 
                            console.log(isFavorite);
                        }
                    })
                    .catch(err => {
                        alert(err);
                    })
            })
            .catch(err => {
                alert(err);
            });
        return () => {
            isActive = false;
        }
    }, [readRoom, getFeedback, roomId])  
    return (
        room == null? 
        <Layout>
            <Spinner animation="border" />
        </Layout> :
        <Layout>
            <h1>{room.room_name}</h1>
            <div className="d-flex justify-content-between">     
            {
                room.rate !== null ? parseFloat(room.rate).toFixed(1) !== 0.0 ? 
                
                <div className="d-flex align-items-end mb-1">
                    <StarRatings
                        numberOfStars={5} 
                        rating={parseFloat(room.rate)}
                        starDimension='20px'
                        starRatedColor='rgb(230, 67, 47)'
                    />
                    <div className="ms-2 me-2">{`${parseFloat(room.rate).toFixed(1)}`}</div>
                </div>
                : "Chưa có đánh giá"  : "Chưa có đánh giá"
            }
            {
                userState && isFavorite &&  
                <div className="d-flex align-items-center">
                    <strong>Lưu</strong>
                    <FavoriteIcon roomId={room.room_id} active={isFavorite} />
                </div>
            }
            </div>
            <Carousel 
                fade 
                variant="dark" 
                className="bg-danger carousel-room gray-border round-radius shadow mb-5"
                prevIcon={<div aria-hidden="true" className="bi bi-arrow-left-circle-fill" />}
                nextIcon={<div aria-hidden="true" className="bi bi-arrow-right-circle-fill" />}
            >
                {room.images.map((imageItem, index) => (
                    <Carousel.Item key={index} className="d-flex justify-content-center" >
                        <img src={imageItem} alt={`Slide ${index}`}/>
                    </Carousel.Item>
                ))}
            </Carousel>
            <div className="billing">
                <BillingCard price={room.price} rating={room.rate} roomId={roomId} hostId={room.host_id}/>     
            </div>
            <div>
                <Badge pill>{`${room.num_guest} khách`}</Badge>{' '}
                <Badge pill>{`${room.num_bed} giường`}</Badge>{' '}
                <Badge pill>{`${room.num_bedroom} phòng tắm`}</Badge>{' '}
            </div>
            <div className="facility m-1">
                <h2>Tiện nghi</h2>
                <ListGroup>
                    {roomFacility != null? room.facilities.map((facilityId) => {
                        return <ListGroupItem key={facilityId}>{roomFacility.find(item => item.id === facilityId).facility}</ListGroupItem>
                    }) : <Spinner animation='border' />}
                </ListGroup>
            </div>
            <div className="rule m-1">
                <h2>Quy định chung</h2>
                <ListGroup>
                    {
                        room.rule.split(";").map((ruleItem, index) => {
                            ruleItem.trim();
                            return <ListGroupItem key={index}>{ruleItem}</ListGroupItem>
                        })
                    }
                </ListGroup>
            </div>
            <div>
                <h2>Đánh giá</h2>
                {userState === null? <p>Đăng nhập để xem đánh giá</p> : feedback === null? 
                    <Spinner animation="border" /> :
                    feedback.total === 0? <p>Chưa có đánh giá nào</p> :
                <ListGroup>
                    {feedback.feedbacks.map(feedbackItem => <FeedbackCard key={feedbackItem.id} feedback={feedbackItem} />)}
                </ListGroup>
                }
            </div>
        </Layout>
    )
}

export default RoomViewPage;