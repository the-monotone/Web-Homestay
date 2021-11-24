import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Container } from "react-bootstrap";
import { ManagerRoomContext } from "../context/managerRoomContext";
import { GET_ROOM } from "../reducer/actionTypes";
import "./roomManager.css";
import { RoomList } from "../components/room/roomList";
import {
  ARRIVING_SOON_INDEX,
  CHECKING_OUT_INDEX,
  CURRENTLY_HOSTING_INDEX,
  EMPTY_INDEX,
} from "../reducer/roomViewTypes";

export const RoomManager = () => {
  const { roomList, dispatch } = useContext(ManagerRoomContext);

  const [checkingArray, setCheckingArray] = useState([true, false, false, false]);

  useEffect(() => {
    dispatch({
      type: GET_ROOM,
      payload: null,
    });
  }, []);

  console.log(roomList);

  const handleClick = (e) => {
    console.log(e.target.id);
    let tempChecking = [false, false, false, false];
    tempChecking[e.target.id] = true;
    setCheckingArray(tempChecking);
  };

  return (
    <Container>
      <div className="room-view-choose">
        <button
          className={"view-type-btn" + (checkingArray[CURRENTLY_HOSTING_INDEX] ? "-choosen" : "")}
          onClick={handleClick}
          id={CURRENTLY_HOSTING_INDEX}
        >{`Hiện đang đón tiếp (${roomList.length})`}</button>
        <button
          className={"view-type-btn" + (checkingArray[ARRIVING_SOON_INDEX] ? "-choosen" : "")}
          onClick={handleClick}
          id={ARRIVING_SOON_INDEX}
        >{`Sắp đến (${roomList.length})`}</button>
        <button
          className={"view-type-btn" + (checkingArray[CHECKING_OUT_INDEX] ? "-choosen" : "")}
          onClick={handleClick}
          id={CHECKING_OUT_INDEX}
        >{`Sắp trả (${roomList.length})`}</button>
        <button
          className={"view-type-btn" + (checkingArray[EMPTY_INDEX] ? "-choosen" : "")}
          onClick={handleClick}
          id={EMPTY_INDEX}
        >{`Trống (${roomList.length})`}</button>
      </div>
      <RoomList roomList={roomList} isEditable={checkingArray[EMPTY_INDEX]} />
    </Container>
  );
};
