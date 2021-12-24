import React, { useContext, useState } from 'react';
import { Formik, Form } from 'formik';
import { Modal } from 'react-bootstrap';
import * as Yup from 'yup';
import { TextField } from '../forms/TextField';
import { UserContext } from '../../context/userContext';
import { WeToast } from '../shared/weToast';

const ForgotPasswordModal = (props) => {
    const { forgotPassword } = useContext(UserContext); 
    const [errorToast, setErrorToast] = useState('');
    const [isToast, setToast] = useState(false);

    const validate = Yup.object({
        username: Yup.string()
            .required("Bắt buộc"),
        email: Yup.string()
            .required("Bắt buộc")
            .email("Không đúng định dạng email"),
    })
    const handleSubmit = (value) => {
        const body = {
            username: value.username.trim(),
            email: value.email.trim()
        }
        forgotPassword(body)
            .then(res => {
                props.onHide();
                props.displaySuccessToast();
            })
            .catch(err => {
                switch(err.response.status) {
                    case 400:
                        setErrorToast('Tài khoản hoặc email không đúng.');
                        setToast(true);
                        break;
                    case 500:
                        setErrorToast('Lỗi hệ thống. Vui lòng thử lại sau.');
                        setToast(true);
                        break;
                    default:
                        setErrorToast("Lỗi hệ thống. Vui lòng thử lại sau.");
                        setToast(true);
                        break;
                }
            })
    }

    return (
        <Modal {...props}>
            <Modal.Header closeButton>
                <Modal.Title>Yêu cầu cấp lại mật khẩu</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{
                        username: '',
                        email: ''
                    }}
                    validationSchema={validate}
                    onSubmit={handleSubmit} >
                    {
                        (formik) => (
                            <Form>
                                <TextField type="text" name="username" placeholder="Tên đăng nhập"/>
                                <TextField type="email" name="email" placeholder="Email đã đăng ký"/>
                                <button type="submit" id="submit-btn-forgot" hidden />
                            </Form>
                        ) 

                    }
                </Formik>
            </Modal.Body>
            <Modal.Footer>
                <label className="btn btn-danger" htmlFor="submit-btn-forgot">Gửi yêu cầu</label> 
            </Modal.Footer>
            <div className={isToast? "d-block position-fixed vh-100 vw-100 top-0 start-0" : "d-none"}>
                <WeToast position="bottom-start" show={isToast} onClose={() => setToast(false)}>
                    {errorToast}
                </WeToast>
            </div>
        </Modal>

    )
}

export default ForgotPasswordModal;