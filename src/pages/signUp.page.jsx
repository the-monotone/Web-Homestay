import React from "react";
import { Formik, Form } from "formik";
import { TextField } from "../components/forms/TextField";
import * as Yup from 'yup';
import { Modal } from "react-bootstrap";
import { SelectButton } from "../components/forms/SelectButton";
import '../components/forms/formik.css'

export const Signup = (props) => {
    const userTypes = [
        {key : 2, value: 'Người đi thuê phòng'},
        {key : 3, value: 'Người cho thuê phòng'}
    ]

    const validate = Yup.object({
        name: Yup.string()
            .max(40, "Nhập tối đa 40 ký tự")
            .required("Bắt buộc"),
        username: Yup.string()
            .max(20, "Nhập tối đa 20 ký tự")
            .required("Bắt buộc"),
        password: Yup.string()
            .min(8, "Độ dài tối thiếu: 8 ký tự")
            .required("Bắt buộc"),
        confirmPassword : Yup.string()
            .oneOf([Yup.ref('password'), null], "Không khớp với mật khẩu")
            .required('Bắt buộc'),
        email: Yup.string()
            .email("Không đúng định dạng email"),
        phone: Yup.number()
            .typeError("Bắt buộc phải là số")
            .positive("Số điện thoại phải lớn hơn 0")
            .integer("Số điện thoại chỉ bao gồm các chữ số")
            .required('Bắt buộc'),
    });

    const handleSubmit = values => console.log('Form data: ', values);
    return (
        <Modal
            {...props}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" as="h6">
                Đăng ký tài khoản
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Formik
                initialValues={{
                    name: '',
                    username: '',
                    password: '',
                    confirmPassword: '',
                    email: '',
                    phone: '',
                    userType: 0
                }}
                validationSchema={validate}
                onSubmit = {handleSubmit}
            >
                {formik => (
                    <div>
                    <h4>Chào mừng bạn đến với Wehome</h4>
                    <Form>
                        <TextField placeholder="Họ và tên" name="name" type="text" />
                        <TextField placeholder="Tên đăng nhập" name="username" type="text" />
                        <TextField placeholder="Mật khẩu" name="password" type="password" />
                        <TextField placeholder="Xác nhận mật khẩu" name="confirmPassword" type="password" />
                        <TextField placeholder="Email" name="email" type="mail" />
                        <TextField placeholder="Số điện thoại" name="phone" type="tel" />
                        <SelectButton label="Bạn là?" name="userType" options = {userTypes} />

                        <button className="btn btn-danger mt-3" type="submit" style = {{width: '100%'}}>Đăng ký</button>
                    </Form> 
                    </div>

                )}
            </Formik>
            </Modal.Body>
        </Modal>
    )
}