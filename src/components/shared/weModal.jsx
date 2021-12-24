import {React, useState, useContext} from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
import { FeedbackContext } from '../../context/feedbackContext';
import { NotificationContext } from '../../context/notificationContext';
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

export const RatingModal = (props) => {
    const userState = JSON.parse(localStorage.getItem("user-state"));
    const { postFeedback } = useContext(FeedbackContext);
    const { socket } = useContext(NotificationContext);
    const [rating, setRating] = useState(5);
    const handleSubmit = (event) => {
        event.preventDefault();
        const body = {
            room_id: props.room_id,
            client_id: props.client_id,
            feedback: event.target[0].value,
            rate: rating
        }
        postFeedback(body, userState.token);
        const options = JSON.stringify({
            room_id: props.room_id
        })
        socket.emit("send_feedback", props.room_id, `Khách ${userState.name} đã đánh giá phòng của bạn|${options}`);
        props.onHide();
    }
    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Đánh giá phòng
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3 d-flex flex-column">
                        <Form.Label>Đánh giá chung</Form.Label>
                        <StarRatings 
                            rating={rating} 
                            changeRating={setRating} 
                            numberOfStars={5} 
                            starDimension='20px'
                            starRatedColor='rgb(230, 67, 47)'
                            name='rating' 
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Mô tả trải nghiệm của bạn</Form.Label>
                        <Form.Control as="textarea" rows="5" required/>
                    </Form.Group>
                    <button type="submit" id="submit-btn-rating" hidden/>
                </Form>
                
            </Modal.Body>
            <Modal.Footer>
                <label className="btn btn-primary" htmlFor="submit-btn-rating">Gửi đánh giá</label>
                <Button variant="danger" onClick={props.onHide}>Hủy</Button>
            </Modal.Footer>
        </Modal>
    )
}