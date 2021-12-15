import React, { useContext, useEffect, useRef } from 'react';
import { Container, Image, Row, Col, Card } from 'react-bootstrap';
import { OnlySearchBar } from '../components/header/search.component';
import { useNavigate, createSearchParams } from 'react-router-dom';
import Layout from '../components/layout.component';
import { SearchContext } from '../context/searchContext';
import useIntersection from '../reducer/useIntersection';
import "./home.css";

const HomePage = () => {
    const userState = JSON.parse(localStorage.getItem("user-state"));
    // const inViewport = useIntersection(ref, '-200px'); // Trigger if 200px is visible from the element
    const {searchBarOnViewport, setOnViewport} = useContext(SearchContext);

    const ref = useRef(null);
    const visible = useIntersection(ref, '0px');

    const handleScroll = () => {
        console.log(visible);
        // setOnViewport(visible);
    }


    useEffect(() => {
        document.addEventListener('scroll', handleScroll,true);
        return () => document.removeEventListener('scroll', handleScroll,true);
    },[])

    return (
        <Layout containerStyleName=''>
            <Row className='bg-dark pt-3 w-100 gx-0 d-flex justify-content-center pb-5 align-items-center home-image-container'>

                <Col md='7' className='mt-5 mb-3'>
                    {
                        searchBarOnViewport && <OnlySearchBar id='home-search-bar'/>
                    }
                </Col>
                <Image className="mt-3" src="hoian-bg.jpg" fluid id="home-img"/>
            </Row>
            <div>.</div>
            <h2 ref={ref}>Cảm hứng cho chuyến đi tiếp theo của bạn</h2>
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
        const body = {
            description: place,
            latitude: latitude,
            longitude: longitude,
            radius: 10
        }
        navigate({
            pathname: "/search",
            search: `?${createSearchParams({...body})}`
        });
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

