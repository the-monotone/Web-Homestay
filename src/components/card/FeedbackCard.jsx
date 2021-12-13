import React, { useContext, useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { UserContext } from '../../context/userContext';

const FeedbackCard = ({feedback}) => {
    const {getInfo} = useContext(UserContext);
    const [name, setName] = useState(null);
    useEffect(() => {
        getInfo(feedback.client_id)
            .then((res) => {
                setName(res.name);
            })
    })
    return (
        <Card>
            <Card.Header>
                <Card.Title>{name}</Card.Title>
                <Card.Subtitle>{new Date(feedback.last_update).toLocaleString()}</Card.Subtitle>
            </Card.Header>
            <Card.Body>
                 <Card.Text>{feedback.feedback}</Card.Text>         
            </Card.Body>
        </Card>
    )
}

export default FeedbackCard;