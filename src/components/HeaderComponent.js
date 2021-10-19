import { faAddressCard, faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import {Collapse, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Modal, ModalBody, ModalHeader, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem } from 'reactstrap';
import LoginForm from './forms/LoginForm';

function Header() {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isCollapse, setCollapse] = useState(false);
    const [isLoginModal, setLoginModal] = useState(false);

    const toggleDropdown = () => setDropdownOpen(prevState => !prevState);
    const toggleNavbar = () => setCollapse(prevState => !prevState);
    const toggleLoginModal = () => setLoginModal(prevState => !prevState);
    return (
        <Navbar light expand="md">
            <div className="container">
                <NavbarToggler onClick={toggleNavbar} />
                <NavbarBrand href="/home" className="me-auto">Homestay</NavbarBrand>
                <Collapse navbar isOpen={isCollapse}>
                    <Nav navbar>
                        <NavItem>
                            <NavLink to="/home" className="nav-link">
                                <FontAwesomeIcon className="fa-lg" icon={faHome}/>
                                {' '}Trang chủ
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/host" className="nav-link">
                                <FontAwesomeIcon className="fa-lg" icon={faAddressCard} />
                                {' '}Trở thành chủ nhà
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <Nav navbar className="ms-auto">
                        <NavItem>
                            <Dropdown isOpen={isDropdownOpen} toggle={toggleDropdown} >
                                <DropdownToggle nav caret>Cài đặt</DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={toggleLoginModal}>
                                        Đăng nhập
                                    </DropdownItem>
                                    <DropdownItem>
                                        Đăng ký
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </NavItem>
                    </Nav>
                </Collapse>
                <Modal isOpen={isLoginModal} toggle={toggleLoginModal}>
                    <ModalHeader toggle={toggleLoginModal}>Đăng nhập</ModalHeader>
                    <ModalBody>
                        <LoginForm />
                    </ModalBody>
                </Modal>
            </div>
        </Navbar>
    )
}

export default Header;