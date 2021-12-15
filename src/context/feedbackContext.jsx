import axios from 'axios';
import React, { createContext } from 'react';
import { WEB_API } from '../config';

export const FeedbackContext = createContext();

const FeedbackContextProvider = ({children}) => {
    const getFeedback = (roomId, token) => {
        return axios.get(`${WEB_API}/api/feedback/${roomId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.data)
            .catch(err => {
                console.error(err);
                const error = new Error(err.message);
                throw(error);
            })
    }

    const postFeedback = (body, token) => {
        return axios.post(`${WEB_API}/api/feedback/create`, body, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                return res.data;
            })
            .catch(err => {
                console.error(err);
                throw(err)
            });
    }

    const getFavorite = (token) => {
        return axios.get(`${WEB_API}/api/favourite`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.data)
            .catch(err => {
                console.error(err);
                throw(err);
            })
    }

    const createFavorite = (body, token) => {
        return axios.post(`${WEB_API}/api/favourite/create`, body, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.data)
            .catch(err => {
                console.error(err);
                throw(err);
            })
    }

    const deleteFavorite = (body, token) => {
        return axios.post(`${WEB_API}/api/favourite/delete`, body, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.data)
            .catch(err => {
                console.error(err);
                throw(err);
            })
    }

    const data = {
        getFeedback,
        postFeedback,
        getFavorite,
        createFavorite,
        deleteFavorite,
    }
    return <FeedbackContext.Provider value={data}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContextProvider;