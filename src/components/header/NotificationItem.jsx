import React from 'react';

const NotificationItem = ({noti}) => {
    const textDecoClass = (noti.status === "UNREAD"? "fw-bold" : "fst-normal");
    return (
        <div className={`noti-item ${textDecoClass}`}>
            <p>{noti.content}</p>
            <small>{new Date(noti.last_update).toLocaleString()}</small>
        </div>
    )
}

export default NotificationItem;