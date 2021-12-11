import {React, useState, useContext} from 'react';
import { Formik, Form } from 'formik';
import { TextField } from '../forms/TextField';
import { Button, Container } from 'react-bootstrap';
import * as Yup from 'yup'
import { LoadingForm } from '../shared/formLoading';
import { UserContext } from '../../context/userContext';
import { UnauthorizedErrorAlert } from '../shared/weModal';
import { WeToast } from '../shared/weToast';

export const EditAccount = ({account, isGetting}) => {

    const userState = JSON.parse(localStorage.getItem('user-state'));

    const [isPosting, setPosting] = useState(false);

    const {user_id, ...userInfo} = account;
    const {getInfo, updateInfo} = useContext(UserContext);
    const [isUnauthor, setUnauthor] = useState(false);
    const [isToast, setToast] = useState(false);


    const handleUpdateInfo = (value) => {
        if(isGetting || isPosting) return;
        const update = async () => {
            setPosting(true);
            await updateInfo(userState.token, value)
                .then(res => {
                    setToast(true);
                })
                .catch(err => {
                    switch(err.status) {
                        case 401:
                            setUnauthor(true);
                            break;
                        case 400:
                            if (err.data.message === 'Failed! Phone number is already in use!') 
                                alert("Số điện thoại đã tồn tại");
                            if (err.data.message === 'Failed! Email is already in use!')
                                alert("Email đã tồn tại");
                            break;
                        default:
                            alert("Lỗi hệ thống, vui lòng thử lại sau.")
                    }
                })
            setPosting(false);
        }
        update();
    }

    const validate = Yup.object({
        name: Yup.string()
            .max(40, "Nhập tối đa 40 ký tự")
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

    return(
        <div>
            <h5>Thông tin chung</h5>
            <Container className = "setting-content-container mt-4 pt-3 pb-3">
                {isGetting ? <LoadingForm/> :
                <Formik
                        initialValues={account}
                        validationSchema={validate}
                        onSubmit = {handleUpdateInfo}
                        className = "setting-content-container"
                    >
                    {formik => (
                        <Form>
                            <TextField label="Tên" name="name" type="text" />
                            <TextField label="Email" name="email" type="mail" />
                            <TextField label="Số điện thoại" name="phone" type="tel" />
                            <Button variant="danger" className="me-3" type="submit" disabled={isPosting}>Lưu</Button>
                            <Button variant="secondary" type="reset" disabled={isPosting}>Huỷ</Button>
                        </Form> 

                    )}
                </Formik>
                }   
            </Container>
            <UnauthorizedErrorAlert show={isUnauthor} onHide={() => setUnauthor(false)}/>
            <WeToast show={isToast} onClose={() => setToast(false)}>Đổi thông tin thành công</WeToast>
        </div>
    )
}