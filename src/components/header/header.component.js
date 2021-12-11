import {React, useState, useContext, useEffect} from 'react';
import {Button, Container, Dropdown, Nav, Navbar, NavItem} from 'react-bootstrap';
import SearchModal from './search.component';
import { Signup } from '../../pages/signUp.page';
import LoginModal from './login.component';
import UnLoggedInDropdown from './unLoggedInDropdown';
import LoggedInDropdown from './loggedInDropdown'; 
import  './header.component.css';
import {UserContext} from '../../context/userContext'
import { WeToast } from '../shared/weToast';
import { useNavigate } from 'react-router-dom';

function Header() {
    const [isLoginModal, setLoginModal] = useState(false);
    const [isSearchModal, setSearchModal] = useState(false);
    const [isSignupModal, setSignupModal] = useState(false);

    const userState = JSON.parse(localStorage.getItem("user-state"));

    const {getInfo, updateInfo} = useContext(UserContext);
    const [isGetting, setGetting] = useState(false);
    const [isHost, setIsHost] = useState(false);

    const naviagate = useNavigate();

    useEffect(()=>{
        if (!userState) return;
        const getData = async () => {
            if (isGetting) return;
            setGetting(true);
            await getInfo(userState.userId)
                .then(data => {
                    console.log(data);
                    setIsHost(data.role === 'host');
                })
                .catch(err => {
                    console.log(err);
                })
            setGetting(false);
        }
        getData();
    },[])

    const becomeHost = async () => {
        if (isGetting) return;
        setGetting(true);
        await updateInfo(userState.token, {role: "host", user_id: userState.userId})
            .then(res => {
                console.log(res);
                naviagate('/host/roommanager');
            })
            .catch(err => {
                console.log(err);
                if(err.status == 401) {
                } else {
                    alert("Lỗi hệ thống, vui lòng thử lại sau!!!");
                }
            })
        setGetting(false);
    }

    return (
        <Navbar id="nav-bar" expand="md" bg="dark" variant="dark" className="position-fixed vw-100">
            <Container fluid="md">
                <Navbar.Toggle />
                <Navbar.Brand href="/" className="order-0 me-auto">Homestay</Navbar.Brand>
                <Navbar.Collapse className="order-last">
                    <Nav navbar>
                        <Nav.Link href="/" className="d-flex align-items-center">
                            <span className="me-1 bi bi-house-fill white-icon small-icon" />
                            {' '}Trang chủ
                        </Nav.Link>
                        { userState != null && userState.token != null &&
                        <Nav.Link href="" className="d-flex align-items-center" onClick={becomeHost}>
                            <span className="me-1 bi bi-person-badge white-icon small-icon" />
                            {' '}{isHost ? 'Quản lý phòng' : 'Trở thành chủ nhà'}
                        </Nav.Link>
                        }
                    </Nav>
                    <Nav navbar className="m-auto">
                        <Button id="search-bar" className="m-1 gray-border shadow round-radius" variant="light" onClick={() => setSearchModal(true)}>
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
                                <Dropdown.Toggle>
                                    <span className="bi bi-bell-fill white-icon"></span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="position-absolute dropdown-menu-end">
                                    <Dropdown.Item>
                                        Hello
                                    </Dropdown.Item>
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
        </Navbar>
    )
}

export default Header;