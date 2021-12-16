/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { Tabs, Tab, Row, Col, Spinner, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import Layout from '../components/layout.component';
import { HostRentalCard } from '../components/shared/hostRentalCard';
import { RentalContext } from '../context/rentalContext';
import { RatingModal } from '../components/shared/weModal';

const RentalViewPage = () => {
    const navigate = useNavigate();
    const [isRate, setRate] = useState(false);
    const [rental, setRental] = useState(null);
    const [roomId, setRoomId] = useState(null);

    const { getRental } = useContext(RentalContext);
    const userState = JSON.parse(localStorage.getItem("user-state"));
    if (userState == null) {
        alert("Bạn chưa đăng nhập");
        navigate("/home", {replace: true});
    }

    const handleClickRate = (room_id) => {
        setRoomId(room_id);
        setRate(true);
    }

    const handleCancel = () => {
        setRate(false);
    }

    useEffect(() => {
        getRental(userState.token, userState.userId)
            .then(res => {
                console.log(res);
                setRental(res.rentals);
            })
    }, []);

    return (
        <Layout>
            <h1>Chuyến đi</h1>
            {
                rental === null ? 
            <Spinner animation="border" /> :
            rental.total > 0? 
            <Tabs defaultActiveKey="renting">
                <Tab eventKey="request" title="Đang yêu cầu">
                    <RentTab handleClickRate={handleClickRate} rentalList={rental.filter((rentalItem) => rentalItem.status === "UNCONFIRMED")} />
                </Tab>
                <Tab eventKey="renting" title="Đang thuê">
                    <RentTab handleClickRate={handleClickRate} rentalList={rental.filter((rentalItem) => rentalItem.status === "CONFIRMED")} />
                </Tab>
                <Tab eventKey="rented" title="Đã thuê">
                    <RentTab canRate handleClickRate={handleClickRate} rentalList={rental.filter((rentalItem) => rentalItem.status === "RETURNED")} />
                </Tab>
            </Tabs> : 
            <p>Chưa có chuyến đi nào</p>
            }
            <RatingModal show={isRate} onHide={handleCancel} room_id={roomId} client_id={userState.userId} />
        </Layout>
    )
}

const RentTab = ({rentalList, canRate, handleClickRate}) => {
    return (
        rentalList.length <= 0 ? 
        <p className="no-rental-text"><i className="bi bi-journal"></i>Hiện không có bản thuê nào</p> :
        <div>
            <Row className = "host-rental-container mt-3 mb-3 g-4" >
            {
                rentalList.map((rental, index) => {
                    return(
                        <Col md = "3" key={index}>
                            <HostRentalCard rental={rental}>
                                {
                                    canRate && 
                                    <Button className="w-100" onClick={() => handleClickRate(rental.room_id)}>
                                        Đánh giá
                                    </Button>
                                }
                            </HostRentalCard>
                        </Col>
                    )
                })
            }
            </Row>
        </div>
    )
}

export default RentalViewPage;