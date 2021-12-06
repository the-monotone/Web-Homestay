import React, {useContext, useState} from 'react';
import { Card, Row, Col, Form, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';
import { RentalContext } from '../context/rentalContext';
import useSearch from '../hook/useSearch';

const renderTooltip = (props) => {
    return (
        <Tooltip id="button-tooltip" {...props}>
            Bạn chưa đăng nhập
        </Tooltip>
    )
}

const dateToString = (date) => {
    return date.toISOString().split('T')[0]
}

const BillingCard = ({roomId, price, rating}) => {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const {startDate, endDate, guest, changeStartDate, changeEndDate, changeGuest} = useSearch();
    const { postRental } = useContext(RentalContext);

    let userState = JSON.parse(localStorage.getItem("user-state"));
    
    if (!isLoggedIn && userState != null) {
        setLoggedIn(true);
    }
    if (isLoggedIn && userState == null) {
        setLoggedIn(false);
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const roomCost = (endDate - startDate) / 24 / 3600 / 1000 * price;
        const body = {
            room_id: roomId,
            begin_date: dateToString(startDate),
            end_date: dateToString(endDate),
            status: "UNCONFIRMED",
            cost: roomCost,
            client_id: userState.userId,
            token: userState.token
        }
        postRental(userState.token, body)
            .then(data => {
                console.log(data);
                if (data.message === "OK") {
                    alert("Đặt phòng thành công");
                } else {
                    alert("Đã xảy ra lỗi. Vui lòng thử lại");
                }
            })
            .catch(err => {
                const error = new Error(err.message);
                alert(error);
            })
    }
    return (
        <Card className="m-1">
            <Card.Header className="d-flex justify-content-between align-items-center">
                <span>
                    <strong>{`${price}₫`}</strong>
                    {"/đêm"}
                </span>
                <span>
                    <i className="bi bi-star-fill"></i>
                    {rating !== null? rating.toFixed(1) : "Chưa có đánh giá"}
                </span>
            </Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col sm="12" md="6">
                            <Form.Group>
                                <Form.Label htmlFor="start-date">Nhận phòng</Form.Label>
                                <ReactDatePicker
                                    name="begin_date"
                                    selected={startDate}
                                    onChange={date => {changeStartDate(date)}} 
                                    dateFormat="dd/MM/yyyy" 
                                    minDate={new Date()} 
                                    maxDate={endDate} 
                                    placeholderText="Thêm ngày"
                                    customInput={<Form.Control/>}
                                    autoComplete="off"
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col sm="12" md="6">
                            <Form.Group>
                                <Form.Label htmlFor="end-date">Trả phòng</Form.Label>
                                <ReactDatePicker
                                    name="end_date"
                                    selected={endDate}
                                    onChange={date => {changeEndDate(date)}} 
                                    dateFormat="dd/MM/yyyy" 
                                    minDate={startDate == null? new Date() : startDate} 
                                    placeholderText="Thêm ngày"
                                    customInput={<Form.Control />}
                                    autoComplete="off"
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Khách</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    name="guest"
                                    placeholder="Thêm khách" 
                                    value={guest} 
                                    required
                                    onChange={(event) => changeGuest(event.target.value)}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Control hidden type="text" name="status" />
                    <Row>
                        <Col className="d-flex justify-content-center">
                            {
                                isLoggedIn? 
                                <Button variant="danger" type="submit" className="mt-1">
                                    Đặt phòng
                                </Button> 
                                :
                                <OverlayTrigger
                                    placement="right"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltip}
                                >
                                    <div>
                                        <Button variant="danger" disabled type="submit" className="mt-1">
                                            Đặt phòng
                                        </Button>
                                    </div>
                                </OverlayTrigger>
                            }
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default BillingCard;