import React, {useContext, useState} from 'react';
import { Card, Row, Col, Form, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';
import { NotificationContext } from '../../context/notificationContext';
import { RentalContext } from '../../context/rentalContext';
import { SearchContext } from '../../context/searchContext';

const renderTooltip = (props) => {
    return (
        <Tooltip id="button-tooltip" {...props}>
            Bạn chưa đăng nhập
        </Tooltip>
    )
}

const displayMoney = (amount) => {
    var formatter = new Intl.NumberFormat('vi', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0,
    });
    return formatter.format(amount);
}

const dateToString = (date) => {
    return date.toISOString().split('T')[0]
}

const GuestPicker = ({ guest, changeGuest }) => {
    const increase = () => {
      changeGuest(guest + 1);
    };
    const decrease = () => {
      if (guest > 0) changeGuest(guest - 1);
    };
    return (
      <div className="d-flex align-items-center">
        <span
          className="bi bi-dash-circle-fill small-icon me-1"
          onClick={decrease}
        ></span>
        <input
          type="number"
          disabled
          autoComplete="off"
          placeholder="Thêm khách"
          value={guest}
          min="0"
          className="text-center input-w100 input-h0"
        />
        <span
          className="bi bi-plus-circle-fill small-icon ms-1"
          onClick={increase}
        ></span>
      </div>
    );
  };

const filterRental = (rentalDateList) => {
    return rentalDateList.map(rental_date => ({
        start: new Date(rental_date.begin_date),
        end: new Date(rental_date.end_date)
    }));
}

const calcMaxStartDate = (startDate, endDate, rentalDateList) => {
    if (startDate === null) startDate = Date.now();
    if (endDate === null) {
        return new Date(new Date().setFullYear(new Date().getFullYear() + 10));
    } else {
        let minDate = new Date(new Date().setFullYear(new Date().getFullYear() + 10));
        for (let rental_date of rentalDateList) {
            let begin_date = new Date(rental_date.begin_date);
            begin_date.setDate(begin_date.getDate() - 1);
            if (begin_date >= startDate) {
                if (begin_date <= minDate) minDate = begin_date;
            }
        }
        if (endDate <= minDate) minDate = endDate;
        return minDate;
    } 
}

const calcMaxEndDate = (startDate, endDate, rentalDateList) => {
    if (endDate === null) endDate = startDate;
    if (startDate === null) {
        return new Date(new Date().setFullYear(new Date().getFullYear() + 10))
    } else {
        let minDate = new Date(new Date().setFullYear(new Date().getFullYear() + 10));
        for (let rental_date of rentalDateList) {
            let begin_date = new Date(rental_date.begin_date);
            begin_date.setDate(begin_date.getDate() - 1);
            if (begin_date >= endDate) {
                if (begin_date <= minDate) minDate = begin_date;
            }
        }
        return minDate;
    }
}

const BillingCard = ({roomId, price, rating, hostId, rentalDateList}) => {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const {startDate, endDate, guest, changeStartDate, changeEndDate, changeGuest} = useContext(SearchContext);
    const { postRental } = useContext(RentalContext);
    const { socket } = useContext(NotificationContext);
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
        startDate.setHours(startDate.getHours() + 8);
        endDate.setHours(startDate.getHours() + 8);
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
                const optionGuest = JSON.stringify({
                    forHost: false,
                    rental_id: data.rental_id,
                    host_id: hostId
                });
                const optionHost = JSON.stringify({
                    forHost: true,
                    rental_id: data.rental_id,
                    client_id: userState.userId
                })
                socket.emit("send_rental", userState.userId, `Đặt phòng thành công. Nhấn để xem chi tiết|${optionGuest}`)
                socket.emit("send_rental", hostId, `Khách ${userState.name} đã gửi yêu cầu đặt phòng của bạn|${optionHost}`);
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
                    <strong>{displayMoney(price)}</strong>
                    {"/đêm"}
                </span>
                <span>
                    <i className="bi bi-star-fill"></i>
                    {rating != null ? parseFloat(rating).toFixed(1) !== 0.0 ? parseFloat(rating).toFixed(1): "Chưa có đánh giá"  : "Chưa có đánh giá"}
                </span>
            </Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col sm="12" md="6">
                            <Form.Group>
                                <strong className="ms-1 search-form-label">Nhận phòng</strong>
                                <ReactDatePicker
                                    name="begin_date"
                                    selected={startDate}
                                    onChange={date => {changeStartDate(date)}} 
                                    dateFormat="dd/MM/yyyy" 
                                    minDate={new Date()} 
                                    maxDate={calcMaxStartDate(startDate, endDate, rentalDateList)} 
                                    excludeDateIntervals={filterRental(rentalDateList)}
                                    placeholderText="Thêm ngày"
                                    customInput={<Form.Control/>}
                                    autoComplete="off"
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col sm="12" md="6">
                            <Form.Group>
                                <strong className="ms-1 search-form-label">Trả phòng</strong>
                                <ReactDatePicker
                                    name="end_date"
                                    selected={endDate}
                                    onChange={date => {changeEndDate(date)}} 
                                    dateFormat="dd/MM/yyyy" 
                                    minDate={startDate === null? new Date() : startDate}
                                    maxDate={calcMaxEndDate(startDate, endDate, rentalDateList)} 
                                    excludeDateIntervals={filterRental(rentalDateList)}
                                    placeholderText="Thêm ngày"
                                    customInput={<Form.Control />}
                                    autoComplete="off"
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col>
                            <strong className="ms-1 search-form-label">Khách</strong>
                                <GuestPicker guest={guest} changeGuest={changeGuest}/>
                        </Col>
                    </Row>
                    <Form.Control hidden type="text" name="status" />
                    <Row>
                        <Col>
                            {
                                isLoggedIn? 
                                <Button variant="danger" type="submit" className="mt-1 w-100">
                                    Đặt phòng
                                </Button> 
                                :
                                <OverlayTrigger
                                    placement="left"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltip}
                                >
                                    <div>
                                        <Button variant="danger" disabled type="submit" className="mt-1 w-100">
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