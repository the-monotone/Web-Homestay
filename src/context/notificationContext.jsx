import axios from 'axios';
import React, { createContext, useState } from 'react';
import socketio from 'socket.io-client';
import { SOCKET_API, WEB_API } from '../config';

export const NotificationContext = createContext();

const getSocket = () => {
    const userState = JSON.parse(localStorage.getItem('user-state'));
    if (!userState) return null;
    return socketio.connect(SOCKET_API, {
        query: { userId: userState.userId }
    });
}

const NotificationProvider = ({children}) => {
    const [socket] = useState(() => getSocket())
    const getNotification = (token) => {
        return axios
            .get(`${WEB_API}/api/notification`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => res.data)
            .catch(err => {
                const error = new Error(err.message);
                throw(error);
            })
    }

    const seenNotification = (notiId, token) => {
        return axios.put(`${WEB_API}/api/notification/${notiId}`, {
            "status" : "SEEN"
        }, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.data)
            .catch(err => {
                console.error(err);
                throw(err);
            })
    } 

    
    const data = {
        socket,
        getNotification,
        getSocket,
        seenNotification
    }

    return <NotificationContext.Provider value={data}>
        {children}
    </NotificationContext.Provider>
}

export default NotificationProvider;