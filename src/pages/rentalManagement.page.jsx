import {React, useContext, useEffect, useState} from 'react';
import { HostRentalCard } from '../components/shared/hostRentalCard';
import {rentalListResponse} from '../Fake Data API/rentalData'
import { Row, Col, Container } from 'react-bootstrap';
import './rentalManagement.css'
import { WePagnigation } from '../components/shared/wePagnigation';
import { RentalContext } from '../context/rentalContext';

export const RentalManagement = () => {

    const {getRentalByHost} = useContext(RentalContext);
    const userState = JSON.parse(localStorage.getItem("user-state"));
    console.log(userState);

    const [rentalList, setRentalList] = useState(rentalListResponse.rentals);
    const [isUnconfirmedList, setUnconfirmedList] = useState(true);
    const [isGetting, setGetting] = useState(false);

    const [rentalPerPage] = useState(12);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRental, setTotalRental] = useState(0);

    const handleClick = (e) => {
        if(e.target.id === '1') {
            setUnconfirmedList(false);
            return;
        }
        setUnconfirmedList(true);
    }

    const handlePageNumber = (number) => setCurrentPage(number);

    useEffect(() => {
        if(isGetting) return;
        const getData = async () => {
            setGetting(true);
            let temp = await getRentalByHost(userState.token, userState.userId)
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                })

            setGetting(false);
        }
        getData();
    },[isUnconfirmedList])

    return(
        <Container >
            <Row className='mb-5 banner'>
                <Col md='12'>
                    <div className='banner-text'>
                        Cùng nhau quản lý danh mục cho thuê thật hiệu quả
                    </div>
                </Col>
        </Row>
            <div className={`rental-view-choose ${isGetting ? "isGetting" : ""}`}>
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
            </div>
            {
                rentalList.length <= 0 ? <p className="no-rental-text"><i className="bi bi-journal"></i>Hiện không có bản thuê nào</p> :
                <div>
                <Row className = "host-rental-container mt-3 mb-3 g-4" >
                {
                    rentalList.map((rental, index) => {
                        return(
                            <Col md = "3" key={index}>
                                <HostRentalCard rental={rental} />
                            </Col>
                        )
                    })
                }
                </Row>
                <WePagnigation 
                    total = {totalRental}  
                    currentPage = {currentPage} 
                    itemPerPage = {rentalPerPage} 
                    setCurrentPage = {handlePageNumber}/>
                </div>
            }
        </Container>
    )
}