import {Button, Container} from 'react-bootstrap';
import { Formik, Form } from 'formik';
import {React, useContext, useState} from 'react';
import * as Yup from 'yup';
import { TextField } from '../forms/TextField';
import { LoadingForm } from '../shared/formLoading';
import { UserContext } from '../../context/userContext';
import { UnauthorizedErrorAlert } from '../shared/weModal';
import { WeToast } from '../shared/weToast';
 
export const PasswordChange = ({isGetting, onSubmit}) => {

    const userState = JSON.parse(localStorage.getItem('user-state'));

    const [isPosting, setPosting] = useState(false);

    const {changePassword} = useContext(UserContext);
    const [isUnauthor, setUnauthor] = useState(false);
    const [isToast, setToast] = useState(false);


    const handleChangePassword = (value) => {
        if(isGetting) return;
        const update = async () => {
            setPosting(true);
            await changePassword(userState.userId, userState.token,value)
                .then(res => {
                    setToast(true);
                })
                .catch(err => {
                    console.log(err);
                    switch(err.status) {
                        case 401:
                            setUnauthor(true);
                            break;
                        case 400:
                            if (err.data.message === 'Password is incorrect') 
                                alert("Sai mật khẩu");
                            break;
                        default:
                            alert("Lỗi hệ thống, vui lòng thử lại sau.")
                    }
                    
                })
                setPosting(false);
        }
        update();
    }

    return(
        <div>
            <h5>Đổi mật khẩu</h5>
            <Container className = "setting-content-container mt-4 pt-3 pb-3">
            {isGetting ? <LoadingForm/> :
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
                        .oneOf([Yup.ref('newPassword'), null], "Không khớp mật khẩu")
                        .required('Bắt buộc'),
                })}
                onSubmit = {handleChangePassword}
            >
                <Form>
                    <TextField label="Mật khẩu cũ" name="currentPassword" type="password" />
                    <TextField label="Mật khẩu mới" name="newPassword" type="password" />
                    <TextField label="Xác nhận mật khẩu" name="confirmNewPassword" type="password" />
                    <Button type='submit' className='me-3' variant='danger' disabled={isPosting}>Lưu</Button>
                    <Button type='reset' variant='secondary' disabled={isPosting}>Huỷ</Button>
                </Form>
            </Formik>
            }
            </Container>
            <UnauthorizedErrorAlert show={isUnauthor} onHide={() => setUnauthor(false)}/>
            <WeToast show={isToast} onClose={() => setToast(false)}>Đổi mật khẩu thành công </WeToast>

        </div>
    )
}