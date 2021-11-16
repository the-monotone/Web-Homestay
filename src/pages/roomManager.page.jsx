import React, { useEffect } from 'react';
import { useContext } from 'react';
import { RoomCard } from '../components/forms/RoomCard';
import { Row, Button } from 'react-bootstrap'
import { ManagerRoomContext } from '../context/managerRoomContext';
import { GET_ROOM } from '../reducer/actionTypes';

export const RoomManager = () => {

    const {roomList, dispatch} = useContext(ManagerRoomContext);
    console.log(roomList);
    useEffect(() => {
        dispatch({
            type: GET_ROOM,
            payload: null
        })
    },[])

    return (
        <Row className="g-4" id="room-list-block">
            {
                roomList.map(room => {
                    return (
                        <Row key = {room.id} id="my-card">
                            <RoomCard room={room}/>
                        </Row>
                    )})
            }
            <Button onClick={() => console.log(roomList)}>Click</Button>
        </Row>
        
    )
}