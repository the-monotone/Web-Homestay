import React, { useState } from 'react';
import {Col, Row, Container} from 'react-bootstrap'
import { PasswordChange } from '../components/user/passwordChange';
import { EditAccount } from '../components/user/editAccount';
import './accountSetting.css'

export const AccountSettings = () => {

    const [settingMode, setSettingMode] = useState('General');
    
    const setGeneralMode = () => {
        setSettingMode('General');
    }
    const setPasswordMode = () => {
        setSettingMode('Password');
    }

    const user = {
        userId: 1,
        name: "Thach",
        phone: "+8412345678",
        email: "123@456",
        userType: "2",
        username: "thach123",
        password: "12345678"
    }

    return (
        <Container>
            <Row className = 'mb-2'><div>Tài khoản</div></Row>
            <Row  className = 'mb-3'>
                <Col md={3} className = 'setting-mode' >
                    <Row className ={'setting-li' + (settingMode === 'General' ? ' isActive' : '')}  onClick = {setGeneralMode}>
                        <div className='acc-general-settings'>Thông tin cá nhân</div>
                    </Row>
                    <Row className = {'setting-li' + (settingMode === 'Password' ? ' isActive' : '')} onClick = {setPasswordMode}>
                        <div className='password-change'>Thay đổi mật khẩu</div>
                    </Row>
                </Col>
                <Col md = {5}>
                {
                    (() => {
                        switch(settingMode) {
                            case 'Password': return <PasswordChange />
                            default: return <EditAccount account = {user}/>
                    }})()
                }
                </Col>
            </Row>
        </Container>
    )
}