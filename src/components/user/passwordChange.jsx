import {Button} from 'react-bootstrap';
import { Formik, Form } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { TextField } from '../forms/TextField';
 
export const PasswordChange = () => {

    const onSubmit = (pass) => {
        console.log(pass);
    }

    return(
        <div>
            <h3>Đổi mật khẩu</h3>
            <Formik
                initialValues = {{
                    currentPassword: '',
                    newPassword: '',
                    confirmNewPassword: ''
                }}
                validationSchema = {Yup.object({
                    newPassword: Yup.string()
                        .min(8, "Độ dài tối thiếu: 8 ký tự")
                        .required("Bắt buộc"),
                    confirmNewPassword : Yup.string()
                        .oneOf([Yup.ref('newPassword'), null], "Không khớp với mật khẩu")
                        .required('Bắt buộc'),
                })}
                onSubmit = {onSubmit}
            >
                <Form>
                    <TextField label="Mật khẩu cũ" name="currentPassword" type="password" />
                    <TextField label="Mật khẩu mới" name="newPassword" type="password" />
                    <TextField label="Xác nhận mật khẩu" name="confirmNewPassword" type="password" />
                    <Button type='submit' className='me-3' variant='outline-success'>Lưu thay đổi</Button>
                    <Button type='reset' variant='outline-secondary'>Huỷ</Button>
                </Form>
            </Formik>
        </div>
    )
}