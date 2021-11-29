import React, { useEffect } from 'react';
import { Tabs, Tab, ListGroup, ListGroupItem } from 'react-bootstrap';
import RentalCard from '../components/RentalCard';
import useRental from '../hook/useRental';


const RentalViewPage = () => {
    const {rental, getRental} = useRental();
    
    useEffect(() => {
        getRental();
    }, [rental]);

    return (
        <div>
            <h1>Xem đơn thuê</h1>
            <Tabs defaultActiveKey="renting">
                <Tab eventKey="request" title="Đang yêu cầu">
                    <RentTab rentalList={rental.filter((rentalItem) => rentalItem.status === 0)} />
                </Tab>
                <Tab eventKey="renting" title="Đang thuê">
                    <RentTab rentalList={rental.filter((rentalItem) => rentalItem.status === 1)} />
                </Tab>
                <Tab eventKey="rented" title="Đã thuê">
                    <RentTab canRate rentalList={rental.filter((rentalItem) => rentalItem.status === 2)} />
                </Tab>
            </Tabs>
        </div>
    )
}

const RentTab = ({rentalList, canRate}) => {
    return (
        <ListGroup>
            {rentalList.map(rental => 
                <ListGroupItem key={rental.id}>
                    <RentalCard canRate={canRate} rental={rental} />
                </ListGroupItem>)}
        </ListGroup>
    )
}

export default RentalViewPage;