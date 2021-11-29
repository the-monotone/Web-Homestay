import React from 'react';
import { useLocation, useParams } from 'react-router';
import { Carousel, Badge, ListGroup, ListGroupItem } from 'react-bootstrap';
import { RoomList, RoomFacility, RoomFeedback } from '../Fake Data API/roomData';
import './roomView.page.css';
import BillingCard from '../components/BillingCard';
import FeedbackCard from '../components/FeedbackCard';

const RoomViewPage = () => {
    const {state} = useLocation();
    var room = state;
    var {roomId} = useParams();
    roomId = parseInt(roomId);
    if (room === null) {    
        room = RoomList.find((room) => room.id === roomId);
    }    
    const roomFeedbacks = RoomFeedback.filter((feedback) => feedback.roomId === roomId);
    return (
        <div>
            <h1>{room.name}</h1>
            <Carousel fade variant="dark" className="carousel-room gray-border round-radius shadow mb-5">
                {room.image.map((imageSrc, index) => (
                    <Carousel.Item key={index} className="d-flex justify-content-center" >
                        <img src={imageSrc} alt={`Slide ${index}`}/>
                    </Carousel.Item>
                ))}
            </Carousel>
            <div className="billing float-end">
                <BillingCard price={room.price} rating={room.rating}/>     
            </div>
            <div>
                <Badge pill>{`${room.num_guest} khách`}</Badge>{' '}
                <Badge pill>{`${room.num_bed} giường`}</Badge>{' '}
                <Badge pill>{`${room.num_bedroom} phòng tắm`}</Badge>{' '}
            </div>
            <div className="facility m-1">
                <h2>Tiện nghi</h2>
                <ListGroup>
                    {room.room_facility.map((facility_id) => {
                        const facility = RoomFacility.find(item => item.id === facility_id);
                        return <ListGroupItem key={facility.id}>{facility.facility}</ListGroupItem>
                    })}
                </ListGroup>
            </div>
            <div className="rule m-1">
                <h2>Quy định chung</h2>
                <ListGroup>
                    {
                        room.rule.split(",").map((ruleItem, index) => {
                            ruleItem.trim();
                            return <ListGroupItem key={index}>{ruleItem}</ListGroupItem>
                        })
                    }
                </ListGroup>
            </div>
            <div>
                <h2>Đánh giá</h2>
                <ListGroup>
                    {
                        roomFeedbacks.map((feedback) => (
                            <ListGroupItem key={feedback.id}>
                                <FeedbackCard feedback={feedback} />
                            </ListGroupItem>
                        ))
                    }
                </ListGroup>
            </div>
        </div>
        
    )
}

export default RoomViewPage;