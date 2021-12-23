import React, {useContext, useState} from 'react';
import { Card, Row, Col, Form, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';
import { NotificationContext } from '../../context/notificationContext';
import { RentalContext } from '../../context/rentalContext';
import { RoomContext } from '../../context/roomContext';

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
    return rentalDateList.map(rental_date => {
        let beginDateInterval = new Date(rental_date.begin_date);
        beginDateInterval.setDate(beginDateInterval.getDate() - 1);
        return {
            start: beginDateInterval,
            end: new Date(rental_date.end_date)
        }
    });
}

const calcMinStartDate = (startDate, endDate, rentalDateList) => {
    if (startDate === null) startDate = Date.now();
    if (endDate === null) {
        return new Date();
    } else {
        let maxDate = new Date(new Date().setFullYear(new Date().getFullYear() - 10));
        for (let rental_date of rentalDateList) {
            let end_date = new Date(rental_date.end_date);
            end_date.setDate(end_date.getDate() + 1);
            if (end_date <= endDate) {
                if (end_date >= maxDate) maxDate = end_date;
            }
        }
        return maxDate;
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
    let search = JSON.parse(localStorage.getItem("search"));
    if (search === null) {
        search = {
            begin_date: null,
            end_date: null,
            num_guest: 0,
        }
    }
    const [startDate, setStartDate] = useState(search.begin_date);
    const [endDate, setEndDate] = useState(search.end_date);
    const [guest, setGuest] = useState(search.num_guest);

    const { getRentalDateByRoom } = useContext(RoomContext);
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
        getRentalDateByRoom(roomId)
            .then(res => {
                for (let rentalDateItem of res) {
                    const startRentalDate = new Date(rentalDateItem.begin_date);
                    const endRentalDate = new Date(rentalDateItem.end_date);
                    if ((startDate >= startRentalDate && startDate <= endRentalDate) ||
                        (endDate >= startRentalDate && endDate <= endRentalDate)) {
                        alert("Bản thuê đã trùng. Vui lòng thử lại.");
                        window.location.reload();
                        return;
                    }
                }
                const roomCost = ((endDate - startDate) / 24 / 3600 / 1000 + 1) * price;
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
                            host_id: hostId
                        });
                        const optionHost = JSON.stringify({
                            forHost: true,
                            client_id: userState.userId
                        })
                        socket.emit("send_rental", userState.userId, `Đã gửi yêu cầu đặt phòng.|${optionGuest}`)
                        socket.emit("send_rental", hostId, `Khách ${userState.name} đã gửi yêu cầu đặt phòng của bạn|${optionHost}`);
                    })
                    .catch(err => {
                        const error = new Error(err.message);
                        alert(error);
                    })
            })
            .catch(err => {
                alert(err);
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
                                    onChange={setStartDate} 
                                    dateFormat="dd/MM/yyyy" 
                                    minDate={calcMinStartDate(startDate, endDate, rentalDateList)} 
                                    maxDate={endDate}
                                    excludeDateIntervals={filterRental(rentalDateList)}
                                    placeholderText="Thêm ngày"
                                    customInput={<Form.Control/>}
                                    autoComplete="off"
                                    isClearable
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
                                    onChange={setEndDate} 
                                    dateFormat="dd/MM/yyyy" 
                                    minDate={startDate === null? new Date() : startDate}
                                    maxDate={calcMaxEndDate(startDate, endDate, rentalDateList)} 
                                    excludeDateIntervals={filterRental(rentalDateList)}
                                    placeholderText="Thêm ngày"
                                    customInput={<Form.Control />}
                                    autoComplete="off"
                                    isClearable
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col>
                            <strong className="ms-1 search-form-label">Khách</strong>
                                <GuestPicker guest={guest} changeGuest={setGuest}/>
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