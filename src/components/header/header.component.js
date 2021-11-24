import { faAddressCard, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {useState} from 'react';
import {Button, Container, Dropdown, Modal, Nav, Navbar, NavItem} from 'react-bootstrap';
import SearchModal from './search.component';
import  './header.component.css';
import { RoomSignUp } from '../../pages/roomSignUp.page';
import { Signup } from '../../pages/signUp.page';

function Header() {
    const [isLoginModal, setLoginModal] = useState(false);
    const [isSearchModal, setSearchModal] = useState(false);
    const [isSignupModal, setSignupModal] = useState(false);

    return (
        <Navbar id="nav-bar" expand="md" bg="dark" variant="dark" className="position-sticky top-0">
            <Container>
                <Navbar.Toggle />
                <Navbar.Brand href="/" className="me-auto">Homestay</Navbar.Brand>
                <Navbar.Collapse>
                    <Nav navbar>
                        <Nav.Link href="/">
                            <FontAwesomeIcon className="fa-lg" icon={faHome}/>
                            {' '}Trang chủ
                        </Nav.Link>
                        <Nav.Link href="/host">
                            <FontAwesomeIcon className="fa-lg" icon={faAddressCard} />
                            {' '}Trở thành chủ nhà
                        </Nav.Link>
                    </Nav>
                    <Nav navbar className="m-auto">
                        <Button id="search-bar" className="gray-border shadow round-radius" variant="light" onClick={() => setSearchModal(true)}>
                            <div>Bắt đầu tìm kiếm</div>
                            <FontAwesomeIcon className="fa-lg search-icon" icon={faSearch} />
                        </Button>
                    </Nav>
                    <Nav navbar className="ms-auto">
                        <NavItem>
                            <Dropdown>
                                <Dropdown.Toggle variant="outline-info">Cài đặt</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => setLoginModal(true)}>
                                        Đăng nhập
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => setSignupModal(true)}>
                                        Đăng ký
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
                <Modal show={isLoginModal} onHide={() => setLoginModal(false)}>
                    <Modal.Header closeButton>Đăng nhập</Modal.Header>
                    <Modal.Body>
                    </Modal.Body>
                </Modal>
                <Signup show={isSignupModal} onHide={() => setSignupModal(false)}/>
                <SearchModal show={isSearchModal} onHide={() => setSearchModal(false)}/>
            </Container>
        </Navbar>
    )
}

export default Header;