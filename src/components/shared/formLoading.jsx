
import React from 'react';
import {Container, Image, Row, Col} from 'react-bootstrap';
import "./loadingCard.css";

export const LoadingForm = () => {


    const url = "https://i.ibb.co/2MDV6nN/form-loading.gif";

    return(
        <Container className = "mb-3 mt-5">
            <Row>
                <Col md = "8" sm ="8"><Image className = "loading-card-col" src={url} alt="Loading"/></Col>
            </Row>
        </Container>
    )
}