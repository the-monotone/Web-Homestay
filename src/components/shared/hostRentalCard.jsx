import {forwardRef, React, useContext} from 'react';
import { Card, OverlayTrigger } from 'react-bootstrap';
import './hostRentalCard.css'
import { RentalContext } from '../../context/rentalContext';
import { WePopover } from './wePopover';
export const HostRentalCard = ({rental, isUnconfirmed, children}) => {
    console.log(rental);

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
            window.location.reload();
        }
        update();
    }

    const ThisWillWork = forwardRef((props, ref) => {
        return <div className = "host-rental-cost" ref={ref}>{`Id: ${rental.cost}`}</div>;
    });

    return(
        <Card className="host-rental-card mb-2">
            <Card.Title className="rental-card-title m-2">{rental.room_name}</Card.Title>
            <Card.Body>
                <OverlayTrigger trigger='click' placement='right' overlay={<WePopover id={rental.client_id}/>}>
                    <div className = "host-rental-cost">{`Id: ${rental.cost}`}</div>
                </OverlayTrigger>
                <div className = "rental-date-container mt-3">
                    <span className = "host-rental-date me-3">{rental.begin_date}</span>
                    <span> <i className="bi bi-caret-right"></i></span>
                    <span className = "host-rental-date ms-3">{rental.end_date}</span>
                </div>
            </Card.Body>
            <Card.Footer>
                <div onClick={hostUpdateRental}>
                    {children}
                </div>
            </Card.Footer>
        </Card>
    )
}

