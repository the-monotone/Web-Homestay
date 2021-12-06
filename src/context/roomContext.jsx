import React, { createContext, useState, useEffect } from 'react';
import { RoomFacility, RoomType } from '../Fake Data API/roomData';
import axios from 'axios';
import {WEB_API} from '../config';

export const RoomContext = createContext();

const RoomContextProvider = ({children}) => {

    //State
    const [roomType, setRoomType] = useState(RoomType);
    const [roomFacility, setRoomFacility] = useState(RoomFacility);
    const [isGetting, setGetting] = useState(false);
    
    useEffect(() => {
        axios.get(`${WEB_API}/api/room/room-type`)
            .then(res => {
                console.log("RoomType API: ",res.data);
                const clone = res.data.map(roomType => {
                    return {
                        key: roomType.room_type_id,
                        value: roomType.room_type
                    }
                })
                setRoomType([...clone]);
            })
            .catch(err => console.log(err))

        axios.get(`${WEB_API}/api/facility`)
            .then(res => {
                console.log("RoomFacility API: ",res.data);
                const clone = res.data.map(facility => {
                    return {
                        id : facility.facility_id,
                        facility: facility.facility,
                        description: facility.description
                    }
                })
                setRoomFacility([...clone]);
            })
            .catch(err => console.log(err))
    }, [])

    const createRoom = (room) => {
        axios.post(`${WEB_API}/api/room/create`, room)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

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