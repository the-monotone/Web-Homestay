/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useState, useEffect} from 'react';
import {Badge, Button, Container, Dropdown, Nav, Navbar, NavItem, Spinner} from 'react-bootstrap';
import SearchModal from './search.component';
import LoginModal from './login.component';
import { Signup } from '../../pages/signUp.page';
import UnLoggedInDropdown from './unLoggedInDropdown';
import LoggedInDropdown from './loggedInDropdown'; 
import { NotificationContext } from '../../context/notificationContext';
import NotificationItem from './NotificationItem';
import {UserContext} from '../../context/userContext'
import { WeToast } from '../shared/weToast';
import { useNavigate } from 'react-router-dom';
import { WeLogoBranch } from '../../logo/logo';

import  './header.component.css';


function Header() {
    const [isLoginModal, setLoginModal] = useState(false);
    const [isSearchModal, setSearchModal] = useState(false);
    const [isSignupModal, setSignupModal] = useState(false);
    
    const [noti, setNoti] = useState([]);
    const [isLoadNoti, setLoadNoti] = useState(false);

    const [isToast, setToast] = useState(false);
    const [toastNoti, setToastNoti] = useState(null);
    const [newNotiCount, setNewNotiCount] = useState(0);
    
    const { socket, getNotification } = useContext(NotificationContext);
    const userState = JSON.parse(localStorage.getItem("user-state"));

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
    
    const handleViewNotification = () => {
        setLoadNoti(true);
        getNotification(userState.token)
            .then(res => {
                console.log(res);
                setNoti(res);
                setLoadNoti(false);
                setNewNotiCount(res.filter((item) => item.status === "UNREAD").length);
            })
            .catch(err => {
                alert(err);
            })
    }

    useEffect(() => {
        if (!userState) return;
        let isActive = true;
        console.log(socket);
        socket.on("receive_rental", (content, sendDate) => {
            if (isActive) {
                setToastNoti({
                    status: "SEEN",
                    content: content,
                    last_update: sendDate
                })
                setToast(true);
                setNewNotiCount((prevCount) => prevCount + 1);
            }
        })
        socket.on("receive_feedback", (content, sendDate) => {
            if (isActive) {
                setToastNoti({
                    status: "SEEN",
                    content: content,
                    last_update: sendDate
                })
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
        <Navbar id="nav-bar" expand="md" bg="dark" variant="dark" className="position-sticky top-0  w-100">
            <Container fluid="md" className='w-100'>
                <Navbar.Toggle />
                <Navbar.Brand href="/" className="order-0 me-auto">
                    <WeLogoBranch roundedCircle style={{ height: 60 }} />
                </Navbar.Brand>
                <Navbar.Collapse className="order-last">
                    <Nav navbar>
                        { userState != null && userState.token != null &&
                        <Nav.Link href="" className="d-flex align-items-center" onClick={hostNavigate}>
                            <span className="me-1 bi bi-person-badge white-icon small-icon" />
                            {' '}{isHost ? 'Quản lý phòng' : 'Trở thành chủ nhà'}
                        </Nav.Link>
                        }
                    </Nav>
                    <Nav navbar className="m-auto">
                        <Button id="search-bar" className="m-1 gray-border shadow rounded-pill" variant="light" onClick={() => setSearchModal(true)}>
                            <div>Bắt đầu tìm kiếm</div>
                            <span className="bi bi-search black-icon small-icon" />
                        </Button>
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
                                        {newNotiCount > 0 && <Badge pill bg="danger">{newNotiCount}</Badge>}
                                    </div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="notification-menu position-absolute dropdown-menu-end">
                                    {   isLoadNoti? <Spinner animation="border" /> : noti.length > 0 ?
                                        noti.map(notiItem => 
                                            <Dropdown.Item key={notiItem.id}>
                                                <NotificationItem noti={notiItem}/>
                                            </Dropdown.Item>) :
                                        <div className="container">
                                            <p>Không có thông báo nào</p>
                                        </div>
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                        </NavItem>
                    }
                    <NavItem>
                        {
                            userState != null && userState.token != null ? 
                                <LoggedInDropdown name={userState.name} /> :
                                <UnLoggedInDropdown 
                                    handleLogin={() => setLoginModal(true)}
                                    handleSignup={() => setSignupModal(true)} />

                        }
                    </NavItem>
                </Nav>
                <Signup show={isSignupModal} onHide={() => setSignupModal(false)}/>
                <LoginModal show={isLoginModal} onHide={() => setLoginModal(false)} />
                <SearchModal show={isSearchModal} onHide={() => setSearchModal(false)}/>
            </Container>
            <div className={isToast? "d-block position-fixed vh-100 vw-100 top-0 start-0" : "d-none"}>
                <WeToast position="bottom-start" show={isToast} onClose={() => setToast(false)}>
                    <NotificationItem noti={toastNoti} />
                </WeToast>
            </div>
        </Navbar>
    )
}

export default Header;