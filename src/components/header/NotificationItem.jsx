import React from 'react';
import { useNavigate } from 'react-router-dom';

const splitContent = (content) => {
    const contentArray = content.split("|");
    return [contentArray[0], JSON.parse(contentArray[1])];
}

const NotificationItem = ({noti}) => {
    const textDecoClass = (noti.status === "UNREAD"? "fw-bold" : "fst-normal");
    const navigate = useNavigate();
    const [exposedNoti, hiddenNoti] = splitContent(noti.content);
    const handleClick = () => {
        switch (noti.status) {
            
        }
    }
    return (
        <div className={`noti-item ${textDecoClass}`}>
            <p>{exposedNoti}</p>
            <small>{new Date(noti.last_update).toLocaleString()}</small>
        </div>
    )
}

export default NotificationItem;