import React from 'react';
import { Card, Row, Col, Carousel, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

const renderTooltip = (props) => {
    return (
        <Tooltip id="button-tooltip" {...props}>
            Chỉ có thể đánh giá trong vòng 10 ngày sau khi trả phòng
        </Tooltip>
    )
}
const RentalCard = ({rental, canRate}) => {
    const disableRating = (new Date() - new Date(rental.endDate)) > 10 * 24 * 3600;
    return (
        <Card>
            <Row>
                <Col md="4">
                    <Carousel fade>
                        {
                            rental.room.image.map((imageSrc, index) => 
                                <Carousel.Item key={index}>
                                    <img className="d-block h-100" src={imageSrc} alt={`Slide ${index}`} />
                                </Carousel.Item>
                            )
                        }
                    </Carousel>
                </Col>
                <Col md="8">
                    <Card.Body>
                        <Card.Title>{rental.room.name}</Card.Title>
                        <Card.Text>{`Giá tiền: ${rental.price} VNĐ`}</Card.Text>
                        <Card.Text>{`Ngày bắt đầu: ${rental.startDate}`}</Card.Text>
                        {
                            canRate &&
                            <OverlayTrigger
                                placement="left"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltip}
                            >
                                <Button className="float-end" disabled={disableRating} >
                                    Đánh giá
                                </Button>
                            </OverlayTrigger>
                        }
                        <Card.Text>{`Ngày kết thúc: ${rental.endDate}`}</Card.Text>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    )
}

export default RentalCard;