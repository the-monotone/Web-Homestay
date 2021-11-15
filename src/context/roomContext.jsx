import React, { createContext, useState } from 'react';
import { RoomFacility, RoomType } from '../Fake Data API/roomData';

export const RoomContext = createContext();

const RoomContextProvider = ({children}) => {

    //State
    const [roomType] = useState(RoomType);
    const [roomFacility] = useState(RoomFacility);

    //data
    const roomContextData = {
        roomType,
        roomFacility
    }

    //Return provider
    return (
        <RoomContext.Provider value={roomContextData}>
            {children}
        </RoomContext.Provider>
    )
}

export default RoomContextProvider  