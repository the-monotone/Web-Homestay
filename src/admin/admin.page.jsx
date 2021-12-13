import React from 'react';
import { Row, Col, Nav, Tab, Container } from 'react-bootstrap';
import { FacilitiesTab } from './facilityTab';
import { ReportTab } from './reportTab';
import { RoomTab } from './roomTab';
import { UserTab } from './userTab';

export const AdminPage = () => {

    return (
        <Row className = 'w-100 vh-100 gx-0'>
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
        </Row>
    )
}