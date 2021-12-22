import React, { useContext, useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { UserContext } from '../../context/userContext';
import StarRatings from 'react-star-ratings';

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
                <div className="d-flex justify-content-between">
                    <Card.Title>{name}</Card.Title>
                    <StarRatings 
                        numberOfStars={5}
                        rating={parseFloat(feedback.rate)}
                        starDimension='20px'
                        starRatedColor='rgb(230, 67, 47)' />
                </div>
                <Card.Subtitle>{new Date(feedback.last_update).toLocaleString()}</Card.Subtitle>
            </Card.Header>
            <Card.Body>
                 <Card.Text>{feedback.feedback}</Card.Text>         
            </Card.Body>
        </Card>
    )
}

export default FeedbackCard;