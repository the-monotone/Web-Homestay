import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { NotificationContext } from '../../context/notificationContext';
import { useLocation } from 'react-router-dom';

const splitContent = (content) => {
    const contentArray = content.split("|");
    return [contentArray[0], JSON.parse(contentArray[1])];
}

const NotificationItem = ({noti, handleClickNoti}) => {
    const textDecoClass = (noti.status === "UNREAD"? "fw-bold" : "fst-normal");
    const { seenNotification } = useContext(NotificationContext);
    const navigate = useNavigate();
    const [exposedNoti, hiddenNoti] = splitContent(noti.content);


    const location = useLocation();

    const handleClick = () => {
        const userState = JSON.parse(localStorage.getItem("user-state"));
        if (noti.status === "UNREAD") {
            handleClickNoti();
            seenNotification(noti.id, userState.token)
                .catch(err => {
                    alert(err);
                })
        }
        if (noti.type === "FEEDBACK") {
            if (location.pathname === `/room/${hiddenNoti.room_id}`) window.location.reload();
            else navigate(`/room/${hiddenNoti.room_id}#feedback`);
        } else if (noti.type === "RENTAL") {
            if (hiddenNoti.forHost === true) {
                if (location.pathname === '/host/rentalmanagement') window.location.reload();
                else navigate(`/host/rentalmanagement`);
            } else {
                if (location.pathname === `/rental/user/${noti.user_id}`) window.location.reload();
                else navigate(`/rental/user/${noti.user_id}`)
            }
        } else if (noti.type === "ROOM") {
            navigate("/host/roommanager");
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