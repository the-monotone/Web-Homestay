/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import {Col, Row, Container} from 'react-bootstrap'
import { PasswordChange } from '../components/user/passwordChange';
import { EditAccount } from '../components/user/editAccount';
import Layout from '../components/layout.component';
import './accountSetting.css'
import { UserContext } from '../context/userContext';

export const AccountSettings = () => {

    const userState = JSON.parse(localStorage.getItem('user-state'));

    const [settingMode, setSettingMode] = useState('General');
    const {getInfo, changePassword} = useContext(UserContext);

    const [userInfo, setUserInfo] = useState({});
    const [isGetting, setGetting] = useState(false);

    useEffect(() => {
        const getData = async () => {
            if (isGetting) return;
            setGetting(true);
            await getInfo(userState.userId)
                .then(data => {
                    console.log(data);
                    setUserInfo({
                        user_id: data.user_id,
                        name: data.name,
                        email: data.email,
                        phone: data.phone
                    })
                })
                .catch(err => {
                    console.log(err);
                })
            setGetting(false);
        }
        getData();
    }, [settingMode])

    const setGeneralMode = () => {
        setSettingMode('General');
    }
    const setPasswordMode = () => {
        setSettingMode('Password');
    }

    return (
        <Layout>
        <Container className='justify-content-center'>
            <Row  className = 'mb-3'>
                <Col md={3} className = 'setting-mode' >
                    <Row className = 'ms-1 mb-3 mt-3 justify-content-center'><h4>Cài đặt</h4></Row>
                    <hr />

                    <Row className = 'justify-content-center'>
                        <Col md = {11}
                            className ={'setting-li' + (settingMode === 'General' ? ' isActive' : '')}  onClick = {setGeneralMode}
                        >
                            <div className='acc-general-settings setting-text'><i className="bi bi-person-lines-fill me-3"></i><span>Thông tin cá nhân</span></div>
                        </Col>
                    </Row>
                    <Row className = 'justify-content-center'>
                        <Col md = {11}
                            className ={'setting-li' + (settingMode === 'Password' ? ' isActive' : '')}  onClick = {setPasswordMode}
                        >
                            <div className='password-change setting-text'><i className="bi bi-shuffle me-3"></i><span>Thay đổi mật khẩu</span></div>
                        </Col>
                    </Row>
                </Col>

                <Col md = {8} >
                    <Row className='justify-content-center mt-3'>
                        <Col md = {8}>
                            {
                                (() => {
                                    switch(settingMode) {
                                        case 'Password': return <PasswordChange isGetting = {isGetting} />
                                        default: return <EditAccount account = {userInfo} isGetting = {isGetting}/>
                                }})()
                            }
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
        </Layout>
    )
}