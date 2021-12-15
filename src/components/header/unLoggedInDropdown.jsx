import React from 'react';
import { Dropdown } from 'react-bootstrap';

const UnLoggedInDropdown = (props) => {
    return (
        <Dropdown>
            <Dropdown.Toggle variant="light" className='border-dark rounded-pill'>
                <span className="bi bi-gear"></span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="position-absolute dropdown-menu-end">
                <Dropdown.Item onClick={props.handleLogin}>
                    Đăng nhập
                </Dropdown.Item>
                <Dropdown.Item onClick={props.handleSignup}>
                    Đăng ký
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default UnLoggedInDropdown;