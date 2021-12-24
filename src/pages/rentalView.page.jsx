/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { Tabs, Tab, Row, Spinner, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import Layout from '../components/layout.component';
import { RentalContext } from '../context/rentalContext';
import { RatingModal } from '../components/shared/weModal';
import { RentalBanner } from '../assets/rentalBanner';
import RentalCard from '../components/card/RentalCard';

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
                setRental(res);
            })
    }, []);

    return (
        <Layout styleName='mt-3 min-height'>
            <Container>
            <h3>Chuyến đi</h3>
            {
                rental === null ? 
            <Spinner animation="border" /> :
            rental.total > 0? 
            <Tabs defaultActiveKey="request">
                <Tab eventKey="request" title="Đang yêu cầu">
                    <RentTab handleClickRate={handleClickRate} rentalList={rental.rentals.filter((rentalItem) => rentalItem.status === "UNCONFIRMED")} />
                </Tab>
                <Tab eventKey="renting" title="Đang thuê">
                    <RentTab handleClickRate={handleClickRate} rentalList={rental.rentals.filter((rentalItem) => rentalItem.status === "CONFIRMED")} />
                </Tab>
                <Tab eventKey="rented" title="Đã thuê">
                    <RentTab canRate handleClickRate={handleClickRate} rentalList={rental.rentals.filter((rentalItem) => rentalItem.status === "RETURNED")} />
                </Tab>
            </Tabs> : 
            <p>Hiện bạn không đặt chỗ nào</p>
            }
            <RatingModal show={isRate} onHide={handleCancel} room_id={roomId} client_id={userState.userId} />
            <Row>
                <RentalBanner/>
            </Row>
            </Container>
        </Layout>
    )
}

const RentTab = ({rentalList, canRate, handleClickRate}) => {
    return (
        rentalList.length <= 0 ? 
        <p className="no-rental-text"><i className="bi bi-journal"></i>Hiện không có bản thuê nào</p> :
        <div className="container">
        <div className="row mt-3 mb-3 g-4" >
            {
                rentalList.map((rental, index) => {
                    return(
                        <div className="col col-sm-6 col-md-4" key={index}>
                            <RentalCard rental={rental}>
                                {
                                    canRate && 
                                    <Button className="w-100" onClick={() => handleClickRate(rental.room_id)}>
                                        Đánh giá
                                    </Button>
                                }
                            </RentalCard>
                        </div>
                    )
                })
            }
        </div>
        </div>
    )
}

export default RentalViewPage;