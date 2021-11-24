import React, {useContext} from 'react';
import { Card, Row, Col, Form, Button } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';
import useSearch from '../hook/useSearch';

const BillingCard = ({price, rating}) => {
    const {startDate, endDate, guest, changeStartDate, changeEndDate, changeGuest} = useSearch();
    return (
        <Card className="m-1">
            <Card.Header className="d-flex justify-content-between align-items-center">
                <span>
                    <strong>{`${price} VND`}</strong>
                    {"/đêm"}
                </span>
                <span>
                    <i className="bi bi-star-fill"></i>
                    {rating.toFixed(1)}
                </span>
            </Card.Header>
            <Card.Body>
                <Form>
                    <Row>
                        <Col sm="12" md="6">
                            <Form.Group>
                                <Form.Label htmlFor="start-date">Nhận phòng</Form.Label>
                                <ReactDatePicker
                                    id="start-date"
                                    selected={startDate}
                                    onChange={date => {changeStartDate(date)}} 
                                    dateFormat="dd/MM/yyyy" 
                                    minDate={new Date()} 
                                    maxDate={endDate} 
                                    placeholderText="Thêm ngày"
                                    customInput={<Form.Control />}
                                />
                            </Form.Group>
                        </Col>
                        <Col sm="12" md="6">
                            <Form.Group>
                                <Form.Label htmlFor="end-date">Trả phòng</Form.Label>
                                <ReactDatePicker
                                    id="end-date"
                                    selected={endDate}
                                    onChange={date => {changeEndDate(date)}} 
                                    dateFormat="dd/MM/yyyy" 
                                    minDate={startDate == null? new Date() : startDate} 
                                    placeholderText="Thêm ngày"
                                    customInput={<Form.Control />}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Khách</Form.Label>
                                <Form.Control type="number" placeholder="Thêm khách" value={guest} onChange={(event) => changeGuest(event.target.value)}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="d-flex justify-content-center">
                            <Button variant="danger" type="submit" className="mt-1">
                                Kiểm tra tình trạng còn phòng
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default BillingCard;