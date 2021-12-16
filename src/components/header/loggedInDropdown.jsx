/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import { WeToast } from '../shared/weToast';
const LoggedInDropdown = () => {
    const userState = JSON.parse(localStorage.getItem("user-state"));
    const [isToast, setToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const { logout } = useContext(UserContext);
    const {getInfo, updateInfo} = useContext(UserContext);
    const [isGetting, setGetting] = useState(false);
    const [isHost, setIsHost] = useState(false);

    const navigate = useNavigate();

    useEffect(()=>{
        if (!userState) return;
        let isActive = true;
        const getData = async () => {
            if (isGetting) return;
            setGetting(true);
            await getInfo(userState.userId)
                .then(data => {
                    console.log(data);
                    if (isActive) setIsHost(data.role === 'host');
                })
                .catch(err => {
                    console.log(err);
                })
            setGetting(false);
        }
        getData();
        return () => {
            isActive = false;
        }
    },[])

    const handleLogout = (token) => {
        logout(token)
            .catch(err => {
                setToast(true);
                setToastMessage(err.message);
            })
    }

    const hostNavigate = () => {
        if (isGetting) return;

        const becomeHost = async () => {
            if (isHost) return;
            setGetting(true);
            await updateInfo(userState.token, {role: "host", user_id: userState.userId})
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                    if(err.status === 401) {
                    } else {
                        alert("Lỗi hệ thống, vui lòng thử lại sau!!!");
                    }
                })
            setGetting(false);
        }
        becomeHost();
        navigate('/host/roommanager');
    }

    return (
        <Dropdown>
            <Dropdown.Toggle variant="primary" className='rounded-pill'>
                <span className="bi bi-gear"></span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="position-absolute dropdown-menu-end">
                <Dropdown.ItemText><strong>{userState.name}</strong></Dropdown.ItemText>
                <Dropdown.Divider />
                <Dropdown.Item href={`/rental/user/${userState.userId}`}>Chuyến đi</Dropdown.Item>
                <Dropdown.Item href="/favorite">Yêu thích</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={hostNavigate}>
                    {' '}{isHost ? 'Quản lý phòng' : 'Trở thành chủ nhà'}
                    <span className="me-1 bi bi-person-badge small-icon" />
                </Dropdown.Item>
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