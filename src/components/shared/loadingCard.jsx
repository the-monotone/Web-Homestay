import React from 'react';
import {Container, Row, Col, Card, Placeholder} from 'react-bootstrap';
import "./loadingCard.css";

export const LoadingCard = ({number}) => {

    const url = "https://i.ibb.co/c14FtPP/card-loading.gif";
    return(
        <Col>
            <Card>
                <Card.Header as={Card.Title} xs = {12} animation="glow">
                    <Placeholder xs={11} bg="secondary"/>
                </Card.Header>
                <Card.Body >
                    <Placeholder as={Card.Title} animation="glow">
                        <Placeholder xs={6} bg="secondary"/>
                    </Placeholder>
                    <Placeholder as={Card.Text} animation="glow">
                        <Placeholder xs={7} bg="secondary"/> <Placeholder xs={4} bg="secondary"/> <Placeholder xs={4} bg="secondary"/>{' '}
                        <Placeholder xs={6} bg="secondary"/> <Placeholder xs={8} bg="secondary"/>
                    </Placeholder>
                </Card.Body>
                <Card.Footer>
                    <Placeholder.Button variant="secondary" xs={12} />
                </Card.Footer>
            </Card>
        </Col>
    )
}

export const LoadingCardList = ({number}) => {
    let cards = []
    for (let i = 0; i < number; i ++) {
        cards.push(<LoadingCard number={number} key = {i}/>);
    }
    return(
    <Row className='w-100'>
        {cards}   
    </Row>
    )
}