import React from 'react';
import { fakeRental } from '../../Fake Data API/rentalData';
import { Card, Row, Col, Button, Badge } from 'react-bootstrap';
import './hostRentalCard.css'
export const HostRentalCard = ({rental}) => {

    const isUnconfirmed = () => {
        return rental.status === "UNCONFIRMED";
    }

    const viewRoom = () => {

    }


    return(
        <Card className="host-rental-card">
            {/* <Card.Img variant="top" src = {rental.images[0]} style={{height: "200px"}}></Card.Img> */}
            <Card.Title className="rental-card-title mt-3">{rental.room_name}</Card.Title>
            <Card.Body>
                <div className = "host-rental-cost">{rental.cost}</div>
                <div className = "rental-date-container mt-3">
                    <span className = "host-rental-date me-3">{rental.begin_date}</span>
                    <span> <i className="bi bi-caret-right"></i></span>
                    <span className = "host-rental-date ms-3">{rental.end_date}</span>
                </div>
            </Card.Body>
            <Card.Footer>
                <Button variant={isUnconfirmed() ? "primary" : "success"} style = {{width: "100%"}}>
                    {isUnconfirmed() ? "Cho thuê" : "Đã trả phòng"}
                </Button>
            </Card.Footer>
        </Card>
    )
}