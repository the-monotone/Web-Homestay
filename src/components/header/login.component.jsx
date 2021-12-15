import React, { useContext, useState } from 'react';
import { Formik, Form } from 'formik';
import { Modal } from 'react-bootstrap';
import * as Yup from 'yup';
import { TextField } from '../forms/TextField';
import { UserContext } from '../../context/userContext';
import { WeToast } from '../shared/weToast';

const LoginModal = (props) => {
    const { login } = useContext(UserContext); 
    const [isToast, setToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
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
            password: value.password.trim()
        }
        login(body)
            .then(res => {
                props.onHide();
                localStorage.setItem("user-state", JSON.stringify(res));
                window.location.reload();
            })
            .catch(err => {
                switch(err.status) {
                    case 400:
                        setToastMessage("Tài khoản hoặc mật khẩu không đúng");
                        setToast(true);
                        break;
                    case 500:
                        setToastMessage("Lỗi hệ thống. Vui lòng thử lại sau");
                        setToast(true);
                        break;
                    default:
                        setToastMessage("Lỗi hệ thống. Vui lòng thử lại sau");
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
                                <button type="reset" id="cancel-btn-login" hidden />
                            </Form>
                        ) 

                    }
                </Formik>
            </Modal.Body>
            <Modal.Footer>
                <label className="btn btn-success" htmlFor="submit-btn-login">Đăng nhập</label> 
                <label className="btn btn-danger" htmlFor="cancel-btn-login">Hủy</label> 
            </Modal.Footer>
            <WeToast show={isToast} onClose={() => setToast(false)}>{toastMessage}</WeToast>
        </Modal>

    )
}

export default LoginModal;