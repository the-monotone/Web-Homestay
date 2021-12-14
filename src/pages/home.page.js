import React, { useContext } from 'react';
import { Container, Image, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout.component';
import { SearchContext } from '../context/searchContext';

import "./home.css";
function HomePage() {
    const userState = JSON.parse(localStorage.getItem("user-state"));
    return (
        <Layout>
            <h1>Home</h1>
            {userState != null && userState.name != null ? <h2>{`Chào mừng bạn, ${userState.name}`}</h2> : null}
            <Image className="mb-5" src="thumbnail.jpg" fluid />
            <h2 >Cảm hứng cho chuyến đi tiếp theo của bạn</h2>
            <Container>
                <Row>
                    <PlaceCard colorVariant="danger" imageSrc="hanoi.jpg" place="Hà Nội" latitude={21.028195403} longitude={105.854159778}/>
                    <PlaceCard colorVariant="info" imageSrc="halong.jpg" place="Hạ Long" latitude={20.9492078640001} longitude={107.074284282} />
                    <PlaceCard colorVariant="dark" imageSrc="sapa.jpg" place="Sa Pa" latitude={22.3331296700001} longitude={103.840040452} />
                    <PlaceCard colorVariant="success" imageSrc="ninhbinh.jpg" place="Ninh Bình" latitude={20.2584345220001} longitude={105.976350094} />
                </Row>
            </Container>
        </Layout>
    )
}

const PlaceCard = ({colorVariant, imageSrc, place, latitude, longitude}) => {
    const {changePlace} = useContext(SearchContext);
    const navigate = useNavigate();
    const handleClick = () => {
        changePlace({
            description: place,
            lat: latitude,
            lng: longitude
        })
        const query = {
            latitude: latitude,
            longitude: longitude,
            radius: 10
        }
        localStorage.setItem("search-query", JSON.stringify(query));
        navigate("/search");
    }
    return (
        <Col lg="3" md="4" sm="6">
            <Card className={`bg-${colorVariant} card-place`} onClick={handleClick}>
                <Image src={imageSrc} className="round-radius" />
                <Card.Body>
                    <h2 className="white-icon" >{place}</h2>
                </Card.Body> 
            </Card>
        </Col>
    )
}

export default HomePage;

