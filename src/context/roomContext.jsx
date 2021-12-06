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

    const userState = JSON.parse(localStorage.getItem("user-state"));
    
    useEffect(() => {
        axios.get(`${WEB_API}/api/room/room-type`)
            .then(res => {
                const clone = res.data.roomTypes.map(roomType => {
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
                const clone = res.data.facilities.map(facility => {
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
        return axios.post(`${WEB_API}/api/room/create`, room, {
                headers: {
                    "Authorization": `Bearer ${userState.token}`
                }
            })
                .then(res => {
                    return "Success";
                })
                .catch(err => {
                    throw(err);
                })
    }

    //data
    const roomContextData = {
        roomType,
        roomFacility,
        createRoom
    }

    //Return provider
    return (
        <RoomContext.Provider value={roomContextData}>
            {children}
        </RoomContext.Provider>
    )
}

export default RoomContextProvider  