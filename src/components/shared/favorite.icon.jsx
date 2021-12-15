import React, { useState, useContext } from 'react';
import { FeedbackContext } from '../../context/feedbackContext';

export const FavoriteIcon = ({roomId, active}) => {
    const [isActive, setActive] = useState(active);
    const [isLoading, setLoading] = useState(false);
    const {createFavorite, deleteFavorite} = useContext(FeedbackContext); 
    const userState = JSON.parse(localStorage.getItem("user-state"));
    const handleClick = () => {
        if (isLoading) return;
        setLoading(true);
        if (active) {
            setActive(false);
            deleteFavorite({room_id: roomId}, userState.token)
                .then((res) => {
                    setLoading(false);
                })
                .catch(err => {
                    alert(err);
                })
        } else {
            setActive(true);
            createFavorite({room_id: roomId}, userState.token)
                .then((res) => {
                    setLoading(false);
                })
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