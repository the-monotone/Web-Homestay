import { faAddressCard, faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import { Collapse, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem } from 'reactstrap';

function Header() {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isCollapse, setCollapse] = useState(false);
    const toggleDropdown = () => setDropdownOpen(prevState => !prevState);
    const toggleNavbar = () => setCollapse(prevState => !prevState);
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
                                    <DropdownItem>Đăng nhập</DropdownItem>
                                    <DropdownItem>Đăng ký</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </NavItem>
                    </Nav>
                </Collapse>
            </div>
        </Navbar>
    )
}

export default Header;