import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { ManagerRoomContext } from "../context/managerRoomContext";
import "./roomManager.css";
import { GET_ARRIVING_ROOMS, GET_CHECKING_OUT_ROOMS, GET_CURRENTLY_HOSTING_ROOMS, GET_EMPTY_ROOMS } from "../reducer/actionTypes";
import { RoomList } from "../components/room/roomList";
import { ARRIVING_SOON_INDEX,CHECKING_OUT_INDEX, CURRENTLY_HOSTING_INDEX, EMPTY_INDEX } from "../reducer/roomViewTypes";
import { LoadingCard } from '../components/room/loadingCard';
import { WePagnigation } from "../components/shared/wePagnigation";
import "./roomManager.css";


export const RoomManager = () => {
  const {getRoomList } = useContext(ManagerRoomContext);
  const [roomList, setRoomList] = useState([]);

  const [isGetting, setGetting] = useState(false);
  const [roomPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRoom, setTotalRoom] = useState(0);
  
  const [checkingArray, setCheckingArray] = useState([true, false, false, false]);

  useEffect(() => {
    if (isGetting) return;
    const getData = async (type) => {
      setGetting(true);
      let temp = await getRoomList(type, roomPerPage, currentPage)
                .then(res => {
                  console.log(res);
                  if (res.message === "No room") setRoomList([]);
                  else {
                    setRoomList([...res.rooms]);
                    setTotalRoom(res.total);
                  }
                })
                .catch(err => console.log(err))
  
      setGetting(false);
    }
    if (checkingArray[1]) getData(GET_ARRIVING_ROOMS)
    else if (checkingArray[2]) getData(GET_CHECKING_OUT_ROOMS);
    else if (checkingArray[3]) getData(GET_EMPTY_ROOMS);
    else getData(GET_CURRENTLY_HOSTING_ROOMS);
  },[checkingArray, currentPage])

  const handleClick = (e) => {
    let tempChecking = [false, false, false, false];
    tempChecking[e.target.id] = true; 
    setCheckingArray(tempChecking);
  };

  const handlePageNumber = (number) => setCurrentPage(number);

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
      <div className={`room-view-choose ${isGetting ? "isGetting" : ""}`}>
        <button
          className={`view-type-btn${(checkingArray[CURRENTLY_HOSTING_INDEX] ? "-choosen" : "")} ${isGetting ? "isGetting" : ""}`}
          onClick={handleClick}
          id={CURRENTLY_HOSTING_INDEX}
        >{`Hiện đang đón tiếp`}</button>
        <button
          className={`view-type-btn${(checkingArray[ARRIVING_SOON_INDEX] ? "-choosen" : "")} ${isGetting ? "isGetting" : ""}`}
          onClick={handleClick}
          id={ARRIVING_SOON_INDEX}
        >{`Sắp đến`}</button>
        <button
          className={`view-type-btn${(checkingArray[CHECKING_OUT_INDEX] ? "-choosen" : "")} ${isGetting ? "isGetting" : ""}`}
          onClick={handleClick}
          id={CHECKING_OUT_INDEX}
        >{`Sắp trả`}</button>
        <button
          className={`view-type-btn${(checkingArray[EMPTY_INDEX] ? "-choosen" : "")} ${isGetting ? "isGetting" : ""}`}
          onClick={handleClick}
          id={EMPTY_INDEX}
        >{`Trống`}</button>
      </div>
      {
        isGetting ? <LoadingCard/> :
        <div>
        <RoomList roomList={roomList} isEditable={checkingArray[EMPTY_INDEX]}/>
        <WePagnigation 
          total = {totalRoom}  
          currentPage = {currentPage} 
          itemPerPage = {roomPerPage} 
          setCurrentPage = {handlePageNumber}/>
        </div>
      }
    </Container>

  );
};
