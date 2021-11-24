import React from "react";
import { Formik, Form } from "formik";
import { TextField } from "../components/forms/TextField";
import * as Yup from 'yup';
import { RadioButton } from "../components/forms/RadioButton";
import { Container, Row,Col, Modal } from "react-bootstrap";
import { SelectButton } from "../components/forms/SelectButton";
import '../components/forms/formik.css'

export const Signup = (props) => {

    const genderOptions = [
        {key: 'male', value: 'Nam'},
        {key: 'female', value: 'Nữ'},
        {key: 'other', value: 'Khác'} 
    ]

    const userTypes = [
        {id : 2, value: 'Người đi thuê phòng'},
        {id : 3, value: 'Người cho thuê phòng'}
    ]

    const validate = Yup.object({
        firstName: Yup.string()
            .max(20, "Nhập tối đa 20 ký tự")
            .required("Bắt buộc"),
        lastName: Yup.string()
            .max(20, "Nhập tối đa 20 ký tự")
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
            .email("Không đúng định dạng email")
            .required("Bắt buộc"),
        phone: Yup.number()
            .typeError("Bắt buộc phải là số")
            .positive("Số điện thoại phải lớn hơn 0")
            .integer("Số điện thoại chỉ bao gồm các chữ số")
            .required('Bắt buộc'),
        gender: Yup.string()
            .required("Bắt buộc"),
    });

    const onSubmit = values => console.log('Form data: ', values);
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
                    firstName: '',
                    lastName: '',
                    username: '',
                    password: '',
                    confirmPassword: '',
                    email: '',
                    phone: '',
                    gender: '',
                    userType: 0
                }}
                validationSchema={validate}
                onSubmit = {onSubmit}
            >
                {formik => (
                    <div>
                    <h4>Chào mừng bạn đến với Wehome</h4>
                    <Form>
                        <TextField label="Họ và tên đệm" name="firstName" type="text" />
                        <TextField label="Tên" name="lastName" type="text" />
                        <TextField label="Tên đăng nhập" name="username" type="text" />
                        <TextField label="Mật khẩu" name="password" type="password" />
                        <TextField label="Xác nhận mật khẩu" name="confirmPassword" type="password" />
                        <TextField label="Email" name="email" type="mail" />
                        <TextField label="Số điện thoại" name="phone" type="tel" />
                        <RadioButton label="Giới tính" name="gender" options = {genderOptions} type="radio" />
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