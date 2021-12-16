import React, { useContext, useEffect, useState } from 'react';
import { Container, Image, Row, Col } from 'react-bootstrap';
import { OnlySearchBar } from '../components/header/search.component';
import { useNavigate, createSearchParams, generatePath } from 'react-router-dom';
import Layout from '../components/layout.component';
import { SearchContext } from '../context/searchContext';
import "./home.css";
import {InView} from 'react-intersection-observer';
import { animated, useSpring } from 'react-spring';

const HomePage = () => {
    // const inViewport = useIntersection(ref, '-200px'); // Trigger if 200px is visible from the element
    const {setOnViewport} = useContext(SearchContext);

    const handleInView = (inView) => {
        setOnViewport(inView)
    }

    useEffect(() => {
        setOnViewport(true);
        return () => {
            localStorage.setItem('unmout' ,"true")
            setOnViewport(false);
        }
    },[])

    return (
        <Layout containerStyleName=''>
            <Row className='bg-dark pt-3 w-100 gx-0 d-flex justify-content-center pb-5 align-items-center home-image-container'>
                <InView as="div" onChange={handleInView}>
                    <div className=''></div>
                </InView>
                <Col md='10' className='mt-3 mb-3 d-flex justify-content-center'>
                    {
                        <OnlySearchBar id='home-search-bar'/>
                    }
                </Col>
                <div id='home-introduce' className='d-flex justify-content-center mb-5'>
                    <Image className="mt-3" src="/hoian-bg.jpg" id="home-img"/>
                    <div id='home-introduce-text' className='text-white position-absolute d-flex flex-column justify-content-center align-items-center'>
                        <div id='introduce-title' className='text-center'>Bạn chưa biết đi đâu?</div>
                        <div id='introduce-sub' className='text-center'>Hãy cùng nhau khám phá những nơi bạn chưa từng đặt chân tới</div>
                    </div>
                </div>
            </Row>

            <Container className='mt-5 pt-1'>
                <Row className='mt-3 mb-5 '><h2 id='hint'>Một số gợi ý của chúng tôi dành cho bạn</h2></Row>
                <Row>
                    <PlaceCard colorVariant="warning" imageSrc="hanoi-img.jpg" place="Hà Nội" latitude={21.028195403} longitude={105.854159778}/>
                    <PlaceCard colorVariant="info" imageSrc="halong-img.jpg" place="Hạ Long" latitude={20.9492078640001} longitude={107.074284282} />
                    <PlaceCard colorVariant="danger" imageSrc="sapa-img.jpg" place="Sa Pa" latitude={22.3331296700001} longitude={103.840040452} />
                    <PlaceCard colorVariant="success" imageSrc="trang an.jpg" place="Ninh Bình" latitude={20.2584345220001} longitude={105.976350094} />
                </Row>
            </Container>
        </Layout>
    )
}

const PlaceCard = ({colorVariant, imageSrc, place, latitude, longitude}) => {

    const [onHover, setHover] = useState(false);

    const cardStyles = useSpring({
        config:{duration: 300},
        
        from: {
            scale: onHover ? 1 : 1.05,
            boxShadow: onHover ? '0px 0px 0px grey' : '0px 0px 20px grey',
            zIndex: onHover ? 0 : 5
        },
        to: {
            scale: onHover ? 1.05 : 1,
            boxShadow: onHover ? '0px 0px 20px grey' : '0px 0px 0px grey',
            zIndex: onHover ? 5 : 0
        }
    })

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
            radius: 20
        }
        localStorage.setItem("search", JSON.stringify(body));
        const path = generatePath("/search?:query", {
            query: createSearchParams({...body})
        })
        navigate(path);
    }
    return (
        <Col lg="3" md="4" sm="6" className='d-flex justify-content-center'
        >
            <animated.div
                style={{...cardStyles}}
            >
                <div className={`cardContainer bg-${colorVariant}`} onClick={handleClick}
                 onMouseEnter={()=>setHover(true)}
                 onMouseLeave={()=>setHover(false)}
                >
                    <div className="cardMain">
                        <div className="cardImg">
                            <Image src={imageSrc} className="" />
                        </div>
                        <div className="info ps-3 pt-3">
                            <h2>{place}</h2>
                        </div>
                    </div>
                </div>
            </animated.div>
        </Col>

    )
}

export default HomePage;

  
