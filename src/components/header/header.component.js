import { faAddressCard, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import {Button, Collapse, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Modal, ModalBody, ModalHeader, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem} from 'reactstrap';
import  './header.css';
import SearchForm from './search.component';

function Header() {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isCollapse, setCollapse] = useState(false);
    const [isLoginModal, setLoginModal] = useState(false);
    const [isSearchModal, setSearchModal] = useState(false);

    const toggleDropdown = () => setDropdownOpen(prevState => !prevState);
    const toggleNavbar = () => setCollapse(prevState => !prevState);
    const toggleLoginModal = () => setLoginModal(prevState => !prevState);
    const toggleSearchModal = () => setSearchModal(prevState => !prevState);

    return (
        <Navbar id="nav-bar" light expand="md" className="flex-column ms-4 me-4">
            <div className="d-md-flex flex-row align-self-stretch">
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
                    <Nav navbar className="m-auto">
                        <Button id="search-bar" className="gray-border shadow round-radius" color="transparent" onClick={toggleSearchModal}>
                            <div>Bắt đầu tìm kiếm</div>
                            <FontAwesomeIcon className="fa-lg search-icon" icon={faSearch} />
                        </Button>
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
                    </ModalBody>
                </Modal>
            </div>
            <div className="align-self-center m-2">
                {isSearchModal && <SearchForm />}
            </div>
        </Navbar>
    )
}

export default Header;