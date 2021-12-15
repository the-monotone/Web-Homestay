import React, { useState, useContext } from 'react';
import { FeedbackContext } from '../../context/feedbackContext';

export const FavoriteIcon = ({roomId, active}) => {
    const [isActive, setActive] = useState(active);
    const {createFavorite, deleteFavorite} = useContext(FeedbackContext); 
    const userState = JSON.parse(localStorage.getItem("user-state"));
    const handleClick = () => {
        if (isActive) {
            setActive(prevState => !prevState);
            deleteFavorite({room_id: roomId}, userState.token)
                .catch(err => {
                    alert(err);
                })
        } else {
            setActive(prevState => !prevState);
            createFavorite({room_id: roomId}, userState.token)
                .catch(err => {
                    alert(err);
                })
        }
    }

    return(
        <div className='rounded-pill d-flex justify-content-center align-items-center' onClick={handleClick}>
        {
            !isActive ? <i className="bi bi-heart"></i> : <i className="bi bi-heart-fill"></i>
        }
        </div>
    )
}