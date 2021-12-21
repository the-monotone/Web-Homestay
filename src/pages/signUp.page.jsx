import React, { useContext, useState } from "react";
import { Formik, Form } from "formik";
import { TextField } from "../components/forms/TextField";
import * as Yup from 'yup';
import { Modal } from "react-bootstrap";
import { SelectButton } from "../components/forms/SelectButton";
import '../components/forms/formik.css'
import { UserContext } from "../context/userContext";
import { WeToast } from "../components/shared/weToast";

export const Signup = (props) => {
    const userTypes = [
        {key : 2, value: 'Người đi thuê phòng'},
        {key : 3, value: 'Người cho thuê phòng'}
    ]

    const {signUp, login} = useContext(UserContext);
    const [isPosting, setPosting] = useState(false);
    const [isToast, setToast] = useState(false);
    const [errorToast, setErrorToast] = useState('');

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
            .email("Không đúng định dạng email")
            .required('Bắt buộc'),
        phone: Yup.number()
            .typeError("Bắt buộc phải là số")
            .positive("Số điện thoại phải lớn hơn 0")
            .integer("Số điện thoại chỉ bao gồm các chữ số")
            .required('Bắt buộc'),
    });

    const handleSubmit = value => {
        if (isPosting) return;
        const doSignUp = async () => {
            setPosting(true);
            const {userType, confirmPassword, ...account} = value;
            console.log(account);
            await signUp({...account, role: userType === 2 ? "client" : "host"})
                .then(res => {
                    const logInAccount = {
                        username: account.username,
                        password: account.password
                    }
                    login(logInAccount)
                        .then(res => {
                            props.onHide();
                            localStorage.setItem("user-state", JSON.stringify(res));
                            props.displaySuccessToast();
                        })
                        .catch(err => {
                            setErrorToast("Lỗi hệ thống, vui lòng thử lại sau.");
                            setToast(true);
                        });
                })
                .catch(err => {
                    console.log(err);
                    if (err.status === 400) {
                        switch(err.data.message) {
                            case 'Failed! Phone number is already in use!':
                                setErrorToast('Số điện thoại đã được đăng ký');
                                setToast(true);
                                break;
                            case 'Failed! Username is already in use!':
                                setErrorToast("Tên đăng nhập đã tồn tại");
                                setToast(true);
                                break;
                            default:
                                setErrorToast("Đăng ký không thành công, vui lòng kiểm tra lại thông tin đăng ký.");
                                setToast(true);
                        }
                    }
                })
            setPosting(false);
        }
        doSignUp();
    }
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
                    userType: 2
                }}
                validationSchema={validate}
                onSubmit = {handleSubmit}
            >
                {formik => (
                    <div>
                        <h5 className="mb-3 text-center">Chào mừng bạn đến với Wehome</h5>
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
            <div className={isToast? "d-block position-fixed vh-100 vw-100 top-0 start-0" : "d-none"}>
                <WeToast position="bottom-start" show={isToast} onClose={() => setToast(false)}>
                    {errorToast}
                </WeToast>
            </div>
        </Modal>
    )
}