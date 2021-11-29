import React, {useState} from 'react';
import {Button, Container, Dropdown, Nav, Navbar, NavItem} from 'react-bootstrap';
import SearchModal from './search.component';
import { Signup } from '../../pages/signUp.page';
import LoginModal from './login.component';
import UnLoggedInDropdown from './unLoggedInDropdown';
import LoggedInDropdown from './loggedInDropdown'; 
import  './header.component.css';

function Header() {
    const [isLoginModal, setLoginModal] = useState(false);
    const [isSearchModal, setSearchModal] = useState(false);
    const [isSignupModal, setSignupModal] = useState(false);

    const userState = JSON.parse(localStorage.getItem("user-state"));

    return (
        <Navbar id="nav-bar" expand="md" bg="dark" variant="dark" className="position-sticky top-0">
            <Container>
                <Navbar.Toggle />
                <Navbar.Brand href="/" className="order-0 me-auto">Homestay</Navbar.Brand>
                <Navbar.Collapse className="order-last">
                    <Nav navbar>
                        <Nav.Link href="/" className="d-flex align-items-center">
                            <span className="me-1 bi bi-house-fill white-icon small-icon" />
                            {' '}Trang chủ
                        </Nav.Link>
                        <Nav.Link href="/host" className="d-flex align-items-center">
                            <span className="me-1 bi bi-person-badge white-icon small-icon" />
                            {' '}Trở thành chủ nhà
                        </Nav.Link>
                    </Nav>
                    <Nav navbar className="m-auto">
                        <Button id="search-bar" className="m-1 gray-border shadow round-radius" variant="light" onClick={() => setSearchModal(true)}>
                            <div>Bắt đầu tìm kiếm</div>
                            <span className="bi bi-search black-icon small-icon" />
                        </Button>
                    </Nav>
                </Navbar.Collapse>
                
                <Nav className="order-1 order-md-last flex-row ms-auto">
                    {
                        userState != null && userState.username != null &&
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
                            userState != null && userState.username != null ? 
                                <LoggedInDropdown username={userState.username} /> :
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

export default Header;