import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { NotificationContext } from '../../context/notificationContext';

const splitContent = (content) => {
    const contentArray = content.split("|");
    return [contentArray[0], JSON.parse(contentArray[1])];
}

const NotificationItem = ({noti}) => {
    const textDecoClass = (noti.status === "UNREAD"? "fw-bold" : "fst-normal");
    const { seenNotification } = useContext(NotificationContext);
    const navigate = useNavigate();
    const [exposedNoti, hiddenNoti] = splitContent(noti.content);
    const handleClick = () => {
        const userState = JSON.parse(localStorage.getItem("user-state"));
        if (noti.status === "UNREAD") {
            seenNotification(noti.id, userState.token)
                .catch(err => {
                    alert(err);
                })
        }
        if (noti.type === "FEEDBACK") {
            navigate(`/room/${hiddenNoti.room_id}#feedback`);
        } else if (noti.type === "RENTAL") {
            if (hiddenNoti.forHost === true) {
                navigate(`/host/rentalmanagement`);
            } else {
                navigate(`/rental/user/${noti.user_id}`)
            }
        }
    }
    return (
        <div className={`noti-item ${textDecoClass}`} onClick={handleClick}>
            <p>{exposedNoti}</p>
            <small>{new Date(noti.last_update).toLocaleString()}</small>
        </div>
    )
}

export default NotificationItem;