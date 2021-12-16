import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Nav, Tab, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { FacilitiesTab } from './facilityTab';
import { ReportTab } from './reportTab';
import { RoomTab } from './roomTab';
import { UserTab } from './userTab';

export const AdminPage = () => {

    const userState = JSON.parse(localStorage.getItem('user-state'));
    const {getInfo} = useContext(UserContext);
    const [isAdmin, setAdmin] = useState(false);
    
    useEffect(() => {
        if (userState) {
            const getData = async () => {
                await getInfo(userState.userId)
                    .then(res => {
                        setAdmin(res.role === 'admin');
                    })
                    .catch(err => console.log(err))
            }
            getData();
        }
    }, [])

    return (
        <Row className = 'w-100 vh-100 gx-0'>
        {!isAdmin ? <DenyAccess/> :  
        <Tab.Container id="left-tabs-example" defaultActiveKey="user" >
            <Row className='gx-0'>
                <Col md='1' className='bg-success d-flex align-items-center justify-content-center' >
                <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                        <Nav.Link eventKey="user" className='text-white'>User</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="room" className='text-white'>Room</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="facility" className='text-white'>Facility</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="report" className='text-white'>Report</Nav.Link>
                    </Nav.Item>
                </Nav>
                </Col>
                <Col md='11' className='bg-dark pt-5'> 
                    <Tab.Content className='w-100'>
                        <Tab.Pane eventKey="user" >
                            <UserTab/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="room">
                            <RoomTab/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="facility">
                            <FacilitiesTab/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="report">
                            <ReportTab/>
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
        }
        </Row>
    )
}

const DenyAccess = () => {
    return(
        <Container
            className='100-vh 100vw fs-1 fw-bold bg-dark text-white pb-5'    
        >
            <Row className='d-flex justify-content-center align-items-center w-100 mt-5 mb-3'>Bạn không thể truy cập trang này</Row>
            <Link className='d-flex justify-content-center align-items-center w-100' to='/home'>
                <Button variant='success' className='w-25'>Quay lại trang chủ</Button>
            </Link>
        </Container>
    )
}