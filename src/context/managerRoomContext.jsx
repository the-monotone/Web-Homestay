import { createContext, React, useState}   from 'react';
import {GET_CURRENTLY_HOSTING_ROOMS } from '../reducer/actionTypes';
import axios from 'axios';
import { WEB_API } from '../config';

export const ManagerRoomContext = createContext();

const RoomListProvider = ({children}) => {


    const ROOM_PER_PAGE = 9;
    const PAGE = 1;

    const [roomList] = useState([]);


    const getRoomList = (user, type = GET_CURRENTLY_HOSTING_ROOMS, roomPerPage = ROOM_PER_PAGE, page = PAGE) => {
        const request = {
            host_id: user.userId,
            filter: type,
            confirmed: true
        }
        return axios.post(`${WEB_API}/api/room/filter?limit=${roomPerPage}&page=${page}`, request, {
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        })
            .then(res => {
                return res.data;
            })
            .catch(err => {
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
