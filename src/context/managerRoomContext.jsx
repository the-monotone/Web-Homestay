import { createContext, React, useEffect, useReducer, useState}   from 'react';
import { roomListReducer } from '../reducer/roomListReducer';
import { RoomList } from '../Fake Data API/roomData'
import { GET_CHECKING_OUT_ROOMS, GET_CURRENTLY_HOSTING_ROOMS, GET_EMPTY_ROOMS } from '../reducer/actionTypes';
import axios from 'axios';
import { WEB_API } from '../config';

export const ManagerRoomContext = createContext();

const RoomListProvider = ({children}) => {

    const userState = JSON.parse(localStorage.getItem("user-state"));

    const [roomList, setRoomList] = useState([]);

    useEffect(() => {
    },[])

    const getRoomList = (type = GET_CURRENTLY_HOSTING_ROOMS) => {
        const request = {
            hostId: userState.userId,
            filter: type
        }
        return axios.post(`${WEB_API}/api/room/filter`, request, {
            headers: {
                "Authorization": `Bearer ${userState.token}`
            }
        })
            .then(res => {
                console.log(res);
                return res.data;
            })
            .catch(err => {
                console.log(err);
                throw(err);
            })  
    }

    const roomListData = {
        roomList,
        getRoomList
    }


    return(
        <ManagerRoomContext.Provider value={roomListData}>
            {children}
        </ManagerRoomContext.Provider>
    )
}

export default RoomListProvider;
