import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const LoggedInDropdown = (props) => {
    const handleLogout = () => {
        localStorage.removeItem("user-state");
        window.location.reload();
    }
    return (
        <Dropdown>
            <Dropdown.Toggle variant="outline-info">
                <span className="bi bi-gear"></span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="position-absolute dropdown-menu-end">
                <Dropdown.ItemText>{props.username}</Dropdown.ItemText>
                <hr />
                <Dropdown.Item>
                    <Link to="/accountsettings">Sửa thông tin</Link>
                </Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>
                    Đăng xuất
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default LoggedInDropdown;