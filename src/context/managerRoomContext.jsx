import { createContext, React, useEffect, useReducer}   from 'react';
import { roomReducer } from '../reducer/roomReducer';
import { RoomList } from '../Fake Data API/roomData'

export const ManagerRoomContext = createContext();

const RoomListProvider = ({children}) => {


    const [roomList, dispatch] = useReducer(roomReducer, RoomList);

    useEffect(() => {
        dispatch({
            type: 'GET_ROOM',
            payload: null
        })
    },[])
    useEffect(() => {
        dispatch({
            type: 'SAVE_ROOM',
            payload: null
        })
    },[roomList])

    const roomListData = {
        roomList,
        dispatch
    }


    return(
        <ManagerRoomContext.Provider value={roomListData}>
            {children}
        </ManagerRoomContext.Provider>
    )
}

export default RoomListProvider;
