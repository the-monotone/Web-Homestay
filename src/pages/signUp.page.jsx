import React from "react";
import { Formik, Form } from "formik";
import { TextField } from "../components/forms/TextField";
import * as Yup from 'yup';
import { RadioButton } from "../components/forms/RadioButton";

export const Signup = () => {

    const genderOptions = [
        {key: 'male', value: 'Nam'},
        {key: 'female', value: 'Nữ'},
        {key: 'other', value: 'Khác'} 
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
        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                username: '',
                password: '',
                confirmPassword: '',
                email: '',
                phone: '',
                gender: ''
            }}
            validationSchema={validate}
            onSubmit = {onSubmit}
        >
            {formik => (
                <div>
                   <h2 className="my-4 font-weight-bold-display-4">Đăng ký tài khoản</h2> 
                   <Form>
                        <TextField label="Họ và tên đệm" name="firstName" type="text" />
                        <TextField label="Tên" name="lastName" type="text" />
                        <TextField label="Tên đăng nhập" name="username" type="text" />
                        <TextField label="Mật khẩu" name="password" type="password" />
                        <TextField label="Xác nhận mật khẩu" name="confirmPassword" type="password" />
                        <TextField label="Email" name="email" type="mail" />
                        <TextField label="Số điện thoại" name="phone" type="tel" />
                        <RadioButton label="Giới tính" name="gender" options = {genderOptions} type="radio" />

                        <button className="btn btn-dark mt-3" type="submit">Đăng ký</button>
                        <button className="btn btn-danger mt-3 ms-3" type="reset">Huỷ</button>
                    </Form> 
                </div>

            )}
        </Formik>
    )
}