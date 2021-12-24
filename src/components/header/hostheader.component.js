/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react';
import {Badge, Container, Dropdown, Nav, Navbar, NavItem, Spinner} from 'react-bootstrap';
import SearchModal from './search.component';
import { Signup } from '../../pages/signUp.page';
import LoginModal from './login.component';
import UnLoggedInDropdown from './unLoggedInDropdown';
import LoggedInDropdown from './loggedInDropdown'; 
import { HeaderContext } from '../../context/headerContext';
import { RENTALMAGSATE, ROOMMAGSTATE } from '../../reducer/actionTypes';
import { WeLogo } from '../../assets/logo';
import NotificationItem from './NotificationItem';
import { NotificationContext } from '../../context/notificationContext';
import { WeToast } from '../shared/weToast';

import  './header.component.css';
import ForgotPasswordModal from './forgotPassword.component';

function HostHeader() {
    const [isLoginModal, setLoginModal] = useState(false);
    const [isSearchModal, setSearchModal] = useState(false);
    const [isSignupModal, setSignupModal] = useState(false);
    const [isForgot, setForgot] = useState(false);

    const userState = JSON.parse(localStorage.getItem("user-state"));

    const {navState} = useContext(HeaderContext);

    const [noti, setNoti] = useState([]);
    const [isLoadNoti, setLoadNoti] = useState(false);

    const [isToast, setToast] = useState(false);
    const [toastNoti, setToastNoti] = useState(null);
    const [newNotiCount, setNewNotiCount] = useState(0);
    
    const { socket, getNotification } = useContext(NotificationContext);

    const handleViewNotification = () => {
        setLoadNoti(true);
        getNotification(userState.token)
            .then(res => {
                setNoti(res);
                setLoadNoti(false);
                setNewNotiCount(res.filter((item) => item.status === "UNREAD").length);
            })
            .catch(err => {
                alert(err);
            })
    }

    const handleForgotPassword = () => {
        setLoginModal(false);
        setForgot(true);
    }

    const handleForgotToast = () => {
        setToastNoti('Đã gửi email cấp lại mật khẩu');
        setToast(true);
    }

    const handleLoginToast = () => {
        setToastNoti('Đăng nhập thành công');
        setToast(true);
    }

    const handleSignupToast = () => {
        setToastNoti('Đăng ký thành công');
        setToast(true);
    }

    useEffect(() => {
        if (!userState) return;
        console.log(socket);
        let isActive = true;
        socket.on("receive_rental", (content, sendDate) => {
            if (isActive) {
                const exposedContent = content.split("|")[0];
                setToastNoti(exposedContent);
                setToast(true);
                setNewNotiCount((prevCount) => prevCount + 1);
            }
        })
        socket.on("receive_feedback", (content, sendDate) => {
            if (isActive) {
                const exposedContent = content.split("|")[0];
                setToastNoti(exposedContent);
                setToast(true);
                setNewNotiCount((prevCount) => prevCount + 1);
            }
        })
        socket.on("receive_room", (content, sendDate) => {
            if (isActive) {
                const exposedContent = content.split("|")[0];
                setToastNoti(exposedContent);
                setToast(true);
                setNewNotiCount((prevCount) => prevCount + 1);
            }
        })
        handleViewNotification();

        return () => {
            isActive = false;
            socket.off("receive_rental");
            socket.off("receive_feedback");
        }
    }, [])

    

    return (
        <Navbar id="nav-bar" expand="md" bg="dark" variant="dark" className="position-sticky top-0">
            <Container fluid="md">
                <Navbar.Toggle />
                <Navbar.Brand href="/" className="order-0 me-auto">
                    <WeLogo roundedCircle style={{ height: 60, width: 60 }} />
                </Navbar.Brand>
                <Navbar.Collapse className="order-last justify-content-center">
                    <Nav navbar>
                        <Nav.Link 
                            href="/host/roommanager" 
                            className="d-flex align-items-center my-nav-link" 
                            active = { navState === ROOMMAGSTATE}
                        >
                            <NavItem>Quản lý phòng</NavItem>
                        </Nav.Link>
                    </Nav>
                    <Nav navbar>
                        <Nav.Link
                            href="/host/rentalmanagement" 
                            className="d-flex align-items-center my-nav-link" 
                            active = { navState === RENTALMAGSATE}
                        >
                            <NavItem>Quản lý cho thuê</NavItem>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                
                <Nav className="order-1 order-md-last flex-row ms-auto">
                    {
                        userState != null && userState.token != null &&
                        <NavItem className="me-1">
                            <Dropdown>
                                <Dropdown.Toggle className='rounded-pill'>
                                    <div onClick={handleViewNotification}>
                                        <span className="bi bi-bell-fill white-icon"></span>
                                        {newNotiCount > 0 && <Badge pill bg="danger" className='position-absolute top-0 start-50' id='noti-badge'>{newNotiCount}</Badge>}
                                    </div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="notification-menu position-absolute dropdown-menu-end">
                                    {   isLoadNoti? <Spinner animation="border" /> : noti.length > 0 ?
                                        noti.map(notiItem => 
                                            <Dropdown.Item key={notiItem.id}>
                                                <NotificationItem noti={notiItem} handleClickNoti={() => {setNewNotiCount(cnt => cnt-1)}}/>
                                            </Dropdown.Item>) :
                                        <div className="container">
                                            <p>Không có thông báo nào</p>
                                        </div>
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                        </NavItem>
                    }
                    <NavItem >
                        {
                            userState != null && userState.token != null ? 
                                <LoggedInDropdown name={userState.name}  /> :
                                <UnLoggedInDropdown 
                                    handleLogin={() => setLoginModal(true)}
                                    handleSignup={() => setSignupModal(true)} />

                        }
                    </NavItem>
                </Nav>
                <Signup show={isSignupModal} onHide={() => setSignupModal(false)} displaySuccessToast={handleSignupToast}/>
                <LoginModal show={isLoginModal} onHide={() => setLoginModal(false)} onClickForgot={handleForgotPassword} displaySuccessToast={handleLoginToast}/>
                <ForgotPasswordModal show={isForgot} onHide={() => setForgot(false)} displaySuccessToast={handleForgotToast}/>
                <SearchModal show={isSearchModal} onHide={() => setSearchModal(false)}/>
            </Container>
            <div className={isToast? "d-block position-fixed vh-100 vw-100 top-0 start-0" : "d-none"}>
                <WeToast position="bottom-start" show={isToast} onClose={() => setToast(false)}>
                    {toastNoti}
                </WeToast>
            </div>
        </Navbar>
    )
}

export default HostHeader;