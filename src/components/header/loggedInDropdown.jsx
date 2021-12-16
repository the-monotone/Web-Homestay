import React, { useContext, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { UserContext } from '../../context/userContext';
import { WeToast } from '../shared/weToast';
const LoggedInDropdown = () => {
    const userState = JSON.parse(localStorage.getItem("user-state"));
    const [isToast, setToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const { logout } = useContext(UserContext);
    const handleLogout = (token) => {
        logout(token)
            .catch(err => {
                setToast(true);
                setToastMessage(err.message);
            })
    }
    return (
        <Dropdown>
            <Dropdown.Toggle variant="light" className='rounded-pill border-dark'>
                <span className="bi bi-person-fill"></span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="position-absolute dropdown-menu-end">
                <Dropdown.ItemText><strong>{userState.name}</strong></Dropdown.ItemText>
                <Dropdown.Divider />
                <Dropdown.Item href={`/rental/user/${userState.userId}`}>Chuyến đi</Dropdown.Item>
                <Dropdown.Item href="/favorite">Yêu thích</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="/accountsettings">Sửa thông tin</Dropdown.Item>
                <Dropdown.Item onClick={() => handleLogout(userState.token)}>Đăng xuất</Dropdown.Item>
            </Dropdown.Menu>
            <div className={isToast? "d-block position-fixed vh-100 vw-100 top-0 start-0" : "d-none"}>
                <WeToast position="bottom-start" show={isToast} onClose={() => setToast(false)}>
                    <p>{toastMessage}</p>
                </WeToast>
            </div>
        </Dropdown>
    )
}

export default LoggedInDropdown;