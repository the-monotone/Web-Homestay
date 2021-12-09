import React from 'react';
import {Container, Image, Row, Col} from 'react-bootstrap';
import "./loadingCard.css";

export const LoadingCard = () => {

    const url = "https://i.ibb.co/c14FtPP/card-loading.gif";
    return(
        <Container className = "mb-3 mt-5">
            <Row>
                <Col md = "3" sm ="4"><Image className = "loading-card-col" src={url} alt="Loading"/></Col>
                <Col md = "3" sm ="4"><Image className = "loading-card-col" src={url} alt="Loading"/></Col>
                <Col md = "3" sm ="4"><Image className = "loading-card-col" src={url} alt="Loading"/></Col>
                <Col md = "3" sm ="4"><Image className = "loading-card-col" src={url} alt="Loading"/></Col>
            </Row>
        </Container>
    )
}