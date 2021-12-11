import {React, useContext} from 'react';
import { Modal, Button,  } from 'react-bootstrap';
import { UserContext } from '../../context/userContext';



export const UnauthorizedErrorAlert = (props) => {
    const userState = JSON.parse(localStorage.getItem("user-state"));
    const {logout} = useContext(UserContext);
    const handleLogout = (token) => {
        logout(token)
            .then(res => {
                alert("Đăng xuất thành công");
            })
            .catch(err => {
                alert(err.message);
            })
    }

    return(
        <Modal 
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Modal heading
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Phiên đăng nhập hết hạn, vui lòng đăng nhập lại</h5>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => handleLogout(userState.userId)}>Đồng ý</Button>
            </Modal.Footer>
        </Modal>
    )
}


export const rentalConfirmAlert = (props) => {
    return(
        <Modal {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Modal heading
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Xác nhận cho thuê?</h5>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Đồng ý</Button>
                <Button onClick={props.onHide}>Thoát</Button>
            </Modal.Footer>
        </Modal>
    )
}