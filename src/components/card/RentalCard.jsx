import React, { useEffect, useRef, useState } from 'react';
import { Card, OverlayTrigger, Row, Col, Overlay, Tooltip } from 'react-bootstrap';
import { WePopover } from '../shared/wePopover';
import './rentalCard.css';

const displayMoney = (amount) => {
    var formatter = new Intl.NumberFormat('vi', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0,
    });
    return formatter.format(amount);
}

const RentalCard = ({rental, children}) => {
    console.log(rental);
    return(
        <Card className="host-rental-card mb-2">
            <Card.Title className="m-2">
                <Row>
                    <Col className="rental-card-title" xs='10'>{rental.room_name}</Col>
                    <Col md='1'>
                        <OverlayTrigger trigger='click' rootClose placement='right' overlay={<WePopover id={rental.host_id}/>}>
                            <span className="bi bi-telephone-outbound-fill"></span>
                        </OverlayTrigger>
                    </Col> 
                </Row>
            </Card.Title>
            <Card.Body>
                <div className = "host-rental-cost">
                    {displayMoney(rental.cost)}
                </div>
                <div className = "rental-date-container mt-3">
                    <span className = "host-rental-date me-3">{new Date(rental.begin_date).toLocaleDateString()}</span>
                    <span> <i className="bi bi-caret-right"></i></span>
                    <span className = "host-rental-date ms-3">{new Date(rental.end_date).toLocaleDateString()}</span>
                </div>
            </Card.Body>
            <Card.Footer>
                {children}
            </Card.Footer>
        </Card>
    )
}

export default RentalCard;