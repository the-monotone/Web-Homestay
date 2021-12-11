import React, {useContext, useState} from 'react';
import {Button, Container, Dropdown, Nav, Navbar, NavItem} from 'react-bootstrap';
import SearchModal from './search.component';
import { Signup } from '../../pages/signUp.page';
import LoginModal from './login.component';
import UnLoggedInDropdown from './unLoggedInDropdown';
import LoggedInDropdown from './loggedInDropdown'; 
import  './header.component.css';
import { HeaderContext } from '../../context/headerContext';
import { RENTALMAGSATE, ROOMMAGSTATE } from '../../reducer/actionTypes';

function HostHeader() {
    const [isLoginModal, setLoginModal] = useState(false);
    const [isSearchModal, setSearchModal] = useState(false);
    const [isSignupModal, setSignupModal] = useState(false);

    const userState = JSON.parse(localStorage.getItem("user-state"));

    const {navState} = useContext(HeaderContext);


    return (
        <Navbar id="nav-bar" expand="md" bg="dark" variant="dark" className="position-fixed vw-100">
            <Container fluid="md">
                <Navbar.Toggle />
                <Navbar.Brand href="/" className="order-0 me-auto">Homestay</Navbar.Brand>
                <Navbar.Collapse className="order-last justify-content-center">
                    <Nav navbar>
                        <Nav.Link 
                            href="/host/roommanager" 
                            className="d-flex align-items-center my-nav-link" 
                            active = { navState === ROOMMAGSTATE}
                        >
                            Quản lý phòng
                        </Nav.Link>
                    </Nav>
                    <Nav navbar>
                        <Nav.Link
                            href="/host/rentalmanagement" 
                            className="d-flex align-items-center my-nav-link" 
                            active = { navState === RENTALMAGSATE}
                        >
                            Quản lý cho thuê
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                
                <Nav className="order-1 order-md-last flex-row ms-auto">
                    {
                        userState != null && userState.token != null &&
                        <NavItem className="me-1">
                            <Dropdown>
                                <Dropdown.Toggle>
                                    <span className="bi bi-bell-fill white-icon"></span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="position-absolute dropdown-menu-end">
                                    <Dropdown.Item>
                                        Hello
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </NavItem>
                    }
                    <NavItem>
                        {
                            userState != null && userState.token != null ? 
                                <LoggedInDropdown name={userState.name} /> :
                                <UnLoggedInDropdown 
                                    handleLogin={() => setLoginModal(true)}
                                    handleSignup={() => setSignupModal(true)} />

                        }
                    </NavItem>
                </Nav>
                <Signup show={isSignupModal} onHide={() => setSignupModal(false)}/>
                <LoginModal show={isLoginModal} onHide={() => setLoginModal(false)} />
                <SearchModal show={isSearchModal} onHide={() => setSearchModal(false)}/>
            </Container>
        </Navbar>
    )
}

export default HostHeader;