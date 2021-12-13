/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { ManagerRoomContext } from "../context/managerRoomContext";
import "./roomManager.css";
import { GET_ARRIVING_ROOMS, GET_CHECKING_OUT_ROOMS, GET_CURRENTLY_HOSTING_ROOMS, GET_EMPTY_ROOMS, ROOMMAGSTATE } from "../reducer/actionTypes";
import { RoomList } from "../components/room/roomList";
import { ARRIVING_SOON_INDEX,CHECKING_OUT_INDEX, CURRENTLY_HOSTING_INDEX, EMPTY_INDEX } from "../reducer/roomViewTypes";
import { WePagination } from "../components/shared/wePagnigation";
import HostLayout from '../components/hostlayout.component'
import "./roomManager.css";
import { HeaderContext } from "../context/headerContext";


export const RoomManager = () => {
  const {getRoomList } = useContext(ManagerRoomContext);
  const [roomList, setRoomList] = useState([]);

  const [isGetting, setGetting] = useState(false);
  const [roomPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRoom, setTotalRoom] = useState(0);
  
  const [checkingArray, setCheckingArray] = useState([true, false, false, false]);

  const [pageChange, setPageChange] = useState(false);

  const {setPage} = useContext(HeaderContext);

  const userState = JSON.parse(localStorage.getItem('user-state'))
  
  useEffect(() => setPage(ROOMMAGSTATE),[]);

  useEffect(()=> {
    setCurrentPage(1);
    setPageChange(!pageChange);
  }, [checkingArray])

  useEffect(() => {
    setPageChange(!pageChange);
  }, [currentPage])

  useEffect(() => {
    if (isGetting) return;
    const getData = async (type) => {
      setGetting(true);
      await getRoomList(userState, type, roomPerPage, currentPage)
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
  },[pageChange])

  const handleClick = (e) => {
    let tempChecking = [false, false, false, false];
    tempChecking[e.target.id] = true; 
    setCheckingArray(tempChecking);
  };

  const handlePageNumber = (number) => setCurrentPage(number);

  return (
    <HostLayout>
    <Container>
        <Row className='mb-5 banner gx-0'>
          <Col md='8' className="d-flex align-items-center">
              <span className='banner-text ms-5'>
                Cùng nhau quản lý phòng thật hiệu quả
              </span>
          </Col>
          <Col md='4' className="d-flex align-items-center justify-content-center">
              <Link to='/host/roomsignup'><Button className='signup-more' variant='light'>Đăng ký thêm</Button></Link>
          </Col>
        </Row>
      <Container className={`room-view-choose ${isGetting ? "isGetting" : ""}`}>
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
      </Container>
      {
        <div>
        <RoomList roomList={roomList} isEditable={checkingArray[EMPTY_INDEX]} isGetting={isGetting}/>
        <WePagination 
          total = {totalRoom}  
          currentPage = {currentPage} 
          itemPerPage = {roomPerPage} 
          setCurrentPage = {handlePageNumber}
          isGetting = {isGetting}
          />
        </div>
      }
    </Container>
    </HostLayout>

  );
};
