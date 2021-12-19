import {forwardRef, React, useContext} from 'react';
import { Card, OverlayTrigger, Row, Col } from 'react-bootstrap';
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
            <Card.Title className="rental-card-title m-2">
                <Row>
                    <Col md='10'>{rental.room_name}</Col>
                    <Col md='1'>
                        <OverlayTrigger trigger='click' placement='right' overlay={<WePopover id={rental.client_id}/>}>
                            <span className="bi bi-telephone-outbound-fill"></span>
                        </OverlayTrigger>
                    </Col> 
                </Row>
            </Card.Title>
            <Card.Body>
                    <div className = "host-rental-cost">{`${rental.cost}`}</div>
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

