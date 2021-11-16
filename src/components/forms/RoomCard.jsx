import React  from 'react';
import { Link } from 'react-router-dom';
import { Badge, Carousel, Col, Row } from 'react-bootstrap';
import { Card, Button } from 'react-bootstrap';
import { FacilityBadgeList } from './FacilityBadgeList';

export const RoomCard = ({room}) => {

    return(
            <Card md="6">
                <Row className="g-0">
                    <Col md="4">
                        <Carousel fade>
                        {
                            room.image.map((imageSrc, index) => {
                                return(
                                    <Carousel.Item key = {index}>
                                        <img
                                        className="d-block w-100"
                                        src={imageSrc}
                                        alt={`Slide ${index}`}
                                        />
                                    </Carousel.Item>
                                )
                            })
                        }
                        </Carousel>
                    </Col>
                    <Col md="8">
                        <Card.Body>
                            <Card.Title>{room.name}</Card.Title>
                            <Badge pill>{`${room.num_guest} khách`}</Badge>{' '}
                            <Badge pill>{`${room.num_bed} giường`}</Badge>{' '}
                            <Badge pill>{`${room.num_bedroom} phòng tắm`}</Badge>{' '}
                            <FacilityBadgeList facList={room.room_facility} />
                            <Link to="/roomedit" state={{room}} id="link-edit-button">
                                <Button>Chỉnh sửa</Button>
                            </Link>
                        </Card.Body>
                    </Col>
                </Row>

            </Card>
        
    );
}