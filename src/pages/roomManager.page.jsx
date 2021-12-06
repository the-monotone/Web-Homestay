import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { ManagerRoomContext } from "../context/managerRoomContext";
import { GET_EMPTY_ROOMS, GET_ROOM } from "../reducer/actionTypes";
import "./roomManager.css";
import { RoomList } from "../components/room/roomList";
import {
  ARRIVING_SOON_INDEX,
  CHECKING_OUT_INDEX,
  CURRENTLY_HOSTING_INDEX,
  EMPTY_INDEX,
} from "../reducer/roomViewTypes";

export const RoomManager = () => {
  const { roomList, getRoomList } = useContext(ManagerRoomContext);

  const [checkingArray, setCheckingArray] = useState([true, false, false, false]);

  useEffect(() => {
    if (checkingArray[1]) getRoomList("Arriving soon");
    else if (checkingArray[2]) getRoomList("Checking out");
    else if (checkingArray[3]) getRoomList("Empty");
    else getRoomList("Currently hosting");
  },[checkingArray])

  const handleClick = (e) => {
    let tempChecking = [false, false, false, false];
    tempChecking[e.target.id] = true; 
    setCheckingArray(tempChecking);
  };



  return (
    <Container>
        <Row className='mb-5 banner'>
          <Col md='8'>
              <div className='banner-text'>
                Cùng nhau quản lý phòng thật hiệu quả
              </div>
          </Col>
          <Col md='4'>
              <Link to='/roomsignup'><Button className='signup-more' variant='success'>Đăng ký thêm</Button></Link>
          </Col>
        </Row>
      <div className="room-view-choose">
        <button
          className={"view-type-btn" + (checkingArray[CURRENTLY_HOSTING_INDEX] ? "-choosen" : "")}
          onClick={handleClick}
          id={CURRENTLY_HOSTING_INDEX}
        >{`Hiện đang đón tiếp`}</button>
        <button
          className={"view-type-btn" + (checkingArray[ARRIVING_SOON_INDEX] ? "-choosen" : "")}
          onClick={handleClick}
          id={ARRIVING_SOON_INDEX}
        >{`Sắp đến`}</button>
        <button
          className={"view-type-btn" + (checkingArray[CHECKING_OUT_INDEX] ? "-choosen" : "")}
          onClick={handleClick}
          id={CHECKING_OUT_INDEX}
        >{`Sắp trả`}</button>
        <button
          className={"view-type-btn" + (checkingArray[EMPTY_INDEX] ? "-choosen" : "")}
          onClick={handleClick}
          id={EMPTY_INDEX}
        >{`Trống`}</button>
      </div>
      <RoomList roomList={roomList} isEditable={checkingArray[EMPTY_INDEX]} />
    </Container>
  );
};
