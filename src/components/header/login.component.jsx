import React, { useContext } from 'react';
import { Formik, Form } from 'formik';
import { Modal } from 'react-bootstrap';
import * as Yup from 'yup';
import { TextField } from '../forms/TextField';
import { UserContext } from '../../context/userContext';

const LoginModal = (props) => {
    const { login } = useContext(UserContext); 
    const validate = Yup.object({
        username: Yup.string()
            .required("Bắt buộc"),
        password: Yup.string()
            .required("Bắt buộc")
    })
    const handleSubmit = (event) => {
        console.log(event); 
        login(event)
            .then(res => {
                props.onHide();
                localStorage.setItem("user-state", JSON.stringify(res));
                alert("Đăng nhập thành công");
            })
            .catch(err => {
                alert(err.message);
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
        </Modal>
    )
}

export default LoginModal;