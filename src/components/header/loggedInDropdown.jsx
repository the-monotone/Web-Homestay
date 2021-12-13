import React, { useContext } from 'react';
import { Dropdown } from 'react-bootstrap';
import { UserContext } from '../../context/userContext';
const LoggedInDropdown = () => {
    const userState = JSON.parse(localStorage.getItem("user-state"));
    const { logout } = useContext(UserContext);
    const handleLogout = (token) => {
        logout(token)
            .then(res => {
                alert("Đăng xuất thành công");
            })
            .catch(err => {
                alert(err.message);
            })
    }
    return (
        <Dropdown>
            <Dropdown.Toggle variant="outline-info" className='rounded-pill'>
                <span className="bi bi-gear"></span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="position-absolute dropdown-menu-end">
                <Dropdown.ItemText>{userState.name}</Dropdown.ItemText>
                <Dropdown.Divider />
                <Dropdown.Item href={`/rental/user/${userState.userId}`}>Chuyến đi</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="/accountsettings">Sửa thông tin</Dropdown.Item>
                <Dropdown.Item onClick={() => handleLogout(userState.token)}>Đăng xuất</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default LoggedInDropdown;