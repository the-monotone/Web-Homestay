import { createContext, React, useEffect, useState}   from 'react';
import axios from 'axios';
import { WEB_API } from '../config';

export const ManagerRoomContext = createContext();

const RoomListProvider = ({children}) => {

    const [roomList, setRoomList] = useState([]);

    useEffect(() => {
        getRoomList();
    },[])

    const getRoomList = (type = "Currently hosting") => {
        const request = {
            hostId: 4,
            filter: type
        }
        axios.post(`${WEB_API}/api/room/filter`, request)
            .then(res => {
                console.log(res);
                setRoomList([...res.data]);
            })
            .catch(err => {
                console.log(err);
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
