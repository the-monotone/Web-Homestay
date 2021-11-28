import React from 'react';
import { Formik, Form } from 'formik';
import { TextField } from '../forms/TextField';
import * as Yup from 'yup'

export const EditAccount = ({account}) => {

    const validate = Yup.object({
        name: Yup.string()
            .max(40, "Nhập tối đa 40 ký tự")
            .required("Bắt buộc"),       
        username: Yup.string()
            .max(20, "Nhập tối đa 20 ký tự")
            .required("Bắt buộc"),
        email: Yup.string()
            .email("Không đúng định dạng email")
            .required("Bắt buộc"),
        phone: Yup.number()
            .typeError("Bắt buộc phải là số")
            .positive("Số điện thoại phải lớn hơn 0")
            .integer("Số điện thoại chỉ bao gồm các chữ số")
            .required('Bắt buộc'),
    });

    const onSubmit = values => console.log('Form data: ', values);
    return(
        <div>
        <h3>Thông tin chung</h3>
        <Formik
                initialValues={account}
                validationSchema={validate}
                onSubmit = {onSubmit}
            >
            {formik => (
                <div>
                <Form>
                    <TextField label="Tên" name="name" type="text" />
                    <TextField label="Email" name="email" type="mail" />
                    <TextField label="Số điện thoại" name="phone" type="tel" />
                    <button className="btn btn-danger mt-3 me-3" type="submit">Lưu</button>
                    <button className="btn btn-secondary mt-3" type="reset">Huỷ thay đổi</button>
                </Form> 
                </div>

            )}
        </Formik>
        </div>
    )
}