/* eslint-disable react-hooks/exhaustive-deps */
import {React, useContext, useEffect, useState} from 'react';
import { HostRentalCard } from '../components/shared/hostRentalCard';
import { Row, Col, Container, Button } from 'react-bootstrap';
import './rentalManagement.css'
import { WePagination } from '../components/shared/wePagnigation';
import { RentalContext } from '../context/rentalContext';
import { LoadingCardList } from '../components/shared/loadingCard';
import HostLayout from '../components/hostlayout.component';
import { HeaderContext } from '../context/headerContext';
import { RENTALMAGSATE } from '../reducer/actionTypes';

export const RentalManagement = () => {

    const {getRentalByHost} = useContext(RentalContext);
    const userState = JSON.parse(localStorage.getItem("user-state"));
    const [pageChange, setPageChange] = useState(false);

    const [rentalList, setRentalList] = useState([]);
    const [isUnconfirmedList, setUnconfirmedList] = useState(true);
    const [isGetting, setGetting] = useState(false);

    const [rentalPerPage] = useState(12);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRental, setTotalRental] = useState(0);

    const {setPage} = useContext(HeaderContext);

    useEffect(() => {
        setPage(RENTALMAGSATE);
    },[])

    const handleClick = (e) => {
        if(e.target.id === '1') {
            setUnconfirmedList(false);
            return;
        }
        setUnconfirmedList(true);
    }

    const handlePageNumber = (number) => setCurrentPage(number);


    useEffect(() => {
        setCurrentPage(1);
        setPageChange(!pageChange);
    }, [isUnconfirmedList])

    useEffect(() => {
        setPageChange(!pageChange);
    }, [currentPage])

    useEffect(() => {
        if(isGetting) return;
        const getData = async () => {
            setGetting(true);
            if (isUnconfirmedList) {
                await getRentalByHost(userState.token, userState.userId, "UNCONFIRMED", currentPage, rentalPerPage)
                    .then(res => {
                        setRentalList([...res.rentals]);
                        setTotalRental(res.total);
                    })
                    .catch(err => {
                        console.log(err);
                    })
            } else {
                await getRentalByHost(userState.token, userState.userId, "CONFIRMED", currentPage, rentalPerPage)
                    .then(res => {
                        setRentalList([...res.rentals]);
                        setTotalRental(res.total);
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
            setGetting(false);
        }
        getData();
    },[pageChange])

    return(
        <HostLayout>
        <Container >
            <Row className='mb-5 banner gx-0 pb-5'>
                <Col md='12' className="d-flex align-items-center">
                    <div className='ms-5 banner-text'>
                        Cùng nhau quản lý danh mục cho thuê
                    </div>
                </Col>
            </Row>
            <Container className={`rental-view-choose ${isGetting ? "isGetting" : ""}`}>
                <button
                className={`rental-type-btn${(isUnconfirmedList ? "-choosen" : "")} ${isGetting ? "isGetting" : ""}`}
                onClick={handleClick}
                id="0"
                >{`Xác nhận cho thuê`}</button>
                <button
                className={`rental-type-btn${(!isUnconfirmedList ? "-choosen" : "")} ${isGetting ? "isGetting" : ""}`}
                onClick={handleClick}
                id="1"
                >{`Xác nhận trả phòng`}</button>
            </Container>
            {
                
                <div>
                <Container className = "host-rental-container mt-3 mb-3 g-4" >
                {
                    isGetting ? <LoadingCardList number = {4}/> : 
                    rentalList.length <= 0 ? <div className="no-rental-text"><div className="bi bi-journal"></div>Hiện không có bản thuê nào</div> :
                    <Row className='mt-3'>
                    {
                        rentalList.map((rental, index) => {
                            return(
                                <Col key={index}>
                                    <HostRentalCard rental={rental} isUnconfirmed={isUnconfirmedList}>
                                        <Button variant={isUnconfirmedList ? "primary" : "success"} style = {{width: "100%"}}>
                                            {isUnconfirmedList ? "Cho thuê" : "Đã trả phòng"}
                                        </Button>
                                    </HostRentalCard>
                                </Col>
                            )
                        })
                    }
                    </Row>
                }
                </Container>
                <WePagination 
                    total = {totalRental}  
                    currentPage = {currentPage} 
                    itemPerPage = {rentalPerPage} 
                    setCurrentPage = {handlePageNumber}
                    isGetting = {isGetting}
                    />
                </div>
            }
        </Container>
        </HostLayout>
    )
}