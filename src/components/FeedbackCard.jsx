import React from 'react';
import { Card } from 'react-bootstrap';

const FeedbackCard = ({feedback}) => {
    return (
        <Card>
            <Card.Header>
                <Card.Title>{feedback.username}</Card.Title>
                <Card.Subtitle>{feedback.createdDate}</Card.Subtitle>
            </Card.Header>
            <Card.Body>
                 <Card.Text>{feedback.description}</Card.Text>         
            </Card.Body>
        </Card>
    )
}

export default FeedbackCard;