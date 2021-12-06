import React from 'react';
import { Card, Row, Col, Carousel, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useNavigate } from 'react-router';

const renderTooltip = (props) => {
    return (
        <Tooltip id="button-tooltip" {...props}>
            Chỉ có thể đánh giá trong vòng 10 ngày sau khi trả phòng
        </Tooltip>
    )
}
const RentalCard = ({rental, canRate, onClickRate}) => {
    const navigate = useNavigate();
    var disableRating = false;
    if (canRate) {
        disableRating = (new Date() - new Date(rental.endDate)) > 10 * 24 * 3600 * 1000;
    }
    const handleClick = (roomId) => {
        navigate(`/room/${roomId}`);
    }

    return (
        <Card>
            <Row>
                <Col md="4">
                    {/* <Carousel fade variant="dark">
                        {
                            rental.room.image.map((imageSrc, index) => 
                                <Carousel.Item key={index} className="d-flex justify-content-center">
                                    <img className="d-block h-100" src={imageSrc} alt={`Slide ${index}`} />
                                </Carousel.Item>
                            )
                        }
                    </Carousel> */}
                </Col>
                <Col md="8">
                    <Card.Body>
                        <Card.Title onClick={() => handleClick(rental.roomId)}>{rental.roomId}</Card.Title>
                        <div className="float-start">
                            <Card.Text>{`Giá tiền: ${rental.cost} VNĐ`}</Card.Text>
                            <Card.Text>{`Ngày bắt đầu: ${rental.begin_date}`}</Card.Text>
                            <Card.Text>{`Ngày kết thúc: ${rental.end_date}`}</Card.Text>
                        </div>
                        {
                            canRate &&
                            <OverlayTrigger
                                placement="left"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltip}
                            >
                                <div className="float-end">
                                <Button disabled={disableRating} onClick={onClickRate}>
                                    Đánh giá
                                </Button>
                                </div>
                            </OverlayTrigger>
                        }
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    )
}

export default RentalCard;