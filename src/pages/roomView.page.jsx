/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Carousel, Badge, ListGroup, ListGroupItem, Spinner } from 'react-bootstrap';
import BillingCard from '../components/card/BillingCard';
import FeedbackCard from '../components/card/FeedbackCard';
import Layout from '../components/layout.component';
import { RoomContext } from '../context/roomContext';
import { FeedbackContext } from '../context/feedbackContext';
import './roomView.page.css';

const RoomViewPage = () => {
    const {readRoom, roomFacility} = useContext(RoomContext);
    const {getFeedback} = useContext(FeedbackContext);
    const [room, setRoom] = useState(null);
    const [feedback, setFeedback] = useState(null);
    const { roomId } = useParams();
    const userState = JSON.parse(localStorage.getItem("user-state"));
    useEffect(() => {
        readRoom(roomId)
            .then(res => {
                console.log(res);
                setRoom(res);
            })
            .catch(err => {
                alert(err);
            });
        if (!userState) return;
        getFeedback(roomId, userState.token)
            .then(res => {
                console.log(res);
                setFeedback(res);
            })
            .catch(err => {
                alert(err);
            })
    }, [readRoom, getFeedback, roomId])  
    return (
        room == null? 
        <Layout>
            <Spinner animation="border" />
        </Layout> :
        <Layout>
            <h1>{room.room_name}</h1>
            <Carousel fade variant="dark" className="bg-danger carousel-room gray-border round-radius shadow mb-5">
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