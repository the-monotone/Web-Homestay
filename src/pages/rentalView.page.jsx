import React, { useEffect, useState } from 'react';
import { Tabs, Tab, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import Layout from '../components/layout.component';
import RateModal from '../components/RateModal';
import RentalCard from '../components/RentalCard';
import useRental from '../hook/useRental';


const RentalViewPage = () => {
    const [isRate, setRate] = useState(false);
    const navigate = useNavigate();
    const {rental, getRental} = useRental();
    const userState = JSON.parse(localStorage.getItem("user-state"));
    if (userState == null) {
        alert("Bạn chưa đăng nhập");
        navigate("/home", {replace: true});
    }
    useEffect(() => getRental(userState.token, userState.userId), [rental]);

    return (
        <Layout>
            <h1>Chuyến đi</h1>
            <Tabs defaultActiveKey="renting">
                <Tab eventKey="request" title="Đang yêu cầu">
                    <RentTab rentalList={rental.filter((rentalItem) => rentalItem.status === "UNCONFIRMED")} />
                </Tab>
                <Tab eventKey="renting" title="Đang thuê">
                    <RentTab rentalList={rental.filter((rentalItem) => rentalItem.status === "CONFIRMED")} />
                </Tab>
                <Tab eventKey="rented" title="Đã thuê">
                    <RentTab canRate onClickRate={() => setRate(true)} rentalList={rental.filter((rentalItem) => rentalItem.status === "RETURNED")} />
                </Tab>
            </Tabs>
            <RateModal show={isRate} onHide={() => setRate(false)} />
        </Layout>
    )
}

const RentTab = ({rentalList, canRate, onClickRate}) => {
    return (
        <ListGroup>
            {rentalList.map(rental => 
                <ListGroupItem key={rental.id} className="m-1">
                    <RentalCard canRate={canRate} rental={rental} onClickRate={onClickRate}/>
                </ListGroupItem>)}
        </ListGroup>
    )
}

export default RentalViewPage;