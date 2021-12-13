import axios from 'axios';
import React, { createContext, useState } from 'react';
import socketio from 'socket.io-client';
import { WEB_API } from '../config';

export const NotificationContext = createContext();

const getSocket = () => {
    const userState = JSON.parse(localStorage.getItem('user-state'));
    if (!userState) return null;
    return socketio.connect(WEB_API, {
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

    
    const data = {
        socket,
        getNotification,
        getSocket,
    }

    return <NotificationContext.Provider value={data}>
        {children}
    </NotificationContext.Provider>
}

export default NotificationProvider;