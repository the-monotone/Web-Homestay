import {React, useContext} from 'react';
import { Card } from 'react-bootstrap';
import './hostRentalCard.css'
import { RentalContext } from '../../context/rentalContext';
export const HostRentalCard = ({rental, isUnconfirmed, children}) => {

    const userState = JSON.parse(localStorage.getItem("user-state"));

    const {updateRental} = useContext(RentalContext);

    const hostUpdateRental = () => {
        const update = async () => {
            const {images, last_update, ...cloneRental} = rental;
            const rentalAfter = {
                ...cloneRental,
                status: isUnconfirmed ? "CONFIRMED" : "RETURNED"
            }
            await updateRental(userState.token, rentalAfter)
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                })
            // window.location.reload();
        }
        update();
    }


    return(
        <Card className="host-rental-card mb-2">
            {/* <Card.Img variant="top" src = {rental.images[0]} style={{height: "200px"}}></Card.Img> */}
            <Card.Title className="rental-card-title mt-3">{rental.room_name}</Card.Title>
            <Card.Body>
                <div className = "host-rental-cost">{rental.cost}</div>
                <div className = "rental-date-container mt-3">
                    <span className = "host-rental-date me-3">{rental.begin_date}</span>
                    <span> <i className="bi bi-caret-right"></i></span>
                    <span className = "host-rental-date ms-3">{rental.end_date}</span>
                </div>
            </Card.Body>
            <Card.Footer>
                {/* <Button variant={isUnconfirmed() ? "primary" : "success"} style = {{width: "100%"}} onClick={hostUpdateRental}>
                    {isUnconfirmed() ? "Cho thuê" : "Đã trả phòng"}
                </Button> */}
                <div onClick={hostUpdateRental}>
                    {children}
                </div>
            </Card.Footer>
        </Card>
    )
}