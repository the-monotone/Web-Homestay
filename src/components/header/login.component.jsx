import React, { useContext, useState } from 'react';
import { Formik, Form } from 'formik';
import { Button, Modal } from 'react-bootstrap';
import * as Yup from 'yup';
import { TextField } from '../forms/TextField';
import { UserContext } from '../../context/userContext';
import { WeToast } from '../shared/weToast';
import {useNavigate} from 'react-router-dom'

const LoginModal = (props) => {
    const { login } = useContext(UserContext); 
    const [errorToast, setErrorToast] = useState('');
    const [isToast, setToast] = useState(false);
    const navigate = useNavigate();

    const validate = Yup.object({
        username: Yup.string()
            .required("Bắt buộc"),
        password: Yup.string()
            .required("Bắt buộc")
    })
    const handleSubmit = (value) => {
        console.log(value); 
        const body = {
            username: value.username.trim(),
            password: value.password
        }
        login(body)
            .then(res => {
                props.onHide();
                localStorage.setItem("user-state", JSON.stringify(res));
                props.displaySuccessToast();
                if(res.role === 'admin') navigate('/onlyadmincanseethis')
                window.location.reload();
            })
            .catch(err => {
                switch(err.response.status) {
                    case 400:
                        setErrorToast("Tài khoản hoặc mật khẩu không đúng.");
                        setToast(true);
                        break;
                    case 500:
                        setErrorToast("Lỗi hệ thống. Vui lòng thử lại sau.");
                        setToast(true);
                        break;
                    default:
                        setErrorToast("Lỗi hệ thống. Vui lòng thử lại sau");
                        setToast(true);
                        break;
                }
            })
    }

    return (
        <Modal {...props}>
            <Modal.Header closeButton>
                <Modal.Title>Đăng nhập</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{
                        username: '',
                        password: ''
                    }}
                    validationSchema={validate}
                    onSubmit={handleSubmit} >
                    {
                        (formik) => (
                            <Form>
                                <TextField type="text" name="username" placeholder="Tên đăng nhập"/>
                                <TextField type="password" name="password" placeholder="Mật khẩu"/>
                                <button type="submit" id="submit-btn-login" hidden />
                            </Form>
                        ) 

                    }
                </Formik>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-primary" onClick={props.onClickForgot}>Quên mật khẩu?</Button>
                <label className="btn btn-danger" htmlFor="submit-btn-login">Đăng nhập</label> 
            </Modal.Footer>
            <div className={isToast? "d-block position-fixed vh-100 vw-100 top-0 start-0" : "d-none"}>
                <WeToast position="bottom-start" show={isToast} onClose={() => setToast(false)}>
                    {errorToast}
                </WeToast>
            </div>
        </Modal>

    )
}

export default LoginModal;