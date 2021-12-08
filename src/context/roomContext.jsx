import React, { createContext, useState, useEffect } from 'react';
import { RoomFacility, RoomType } from '../Fake Data API/roomData';
import axios from 'axios';
import {WEB_API} from '../config';

export const RoomContext = createContext();

const RoomContextProvider = ({children}) => {

    //State
    const [roomType, setRoomType] = useState(RoomType);
    const [roomFacility, setRoomFacility] = useState(RoomFacility);

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
                    console.log("Room register res: ", res);
                    return "Success";
                })
                .catch(err => {
                    console.log("Room register Err: ", err);
                    throw(err);
                })
    }

    const updateRoom = (room) => {
        return axios.put(`${WEB_API}/api/room/${room.room_id}`, room, {
                headers: {
                    "Authorization": `Bearer ${userState.token}`
                }
        })
            .then(res => {
                console.log(res);
                return "Update success";
            })
            .catch(err => {
                console.log(err);
                throw(err);
            })
    }

    const deleteRoom = (id) => {
        console.log(id);
        return axios.delete(`${WEB_API}/api/room/${id}`,{
            headers: {
                "Authorization": `Bearer ${userState.token}`
            }
        })
            .then(res => {
                console.log(res);
                return "Delete Success";
            })
            .catch(err => {
                console.log(err);
                throw(err);
            })
    }

    //data
    const roomContextData = {
        roomType,
        roomFacility,
        updateRoom,
        createRoom,
        deleteRoom
    }

    //Return provider
    return (
        <RoomContext.Provider value={roomContextData}>
            {children}
        </RoomContext.Provider>
    )
}

export default RoomContextProvider  