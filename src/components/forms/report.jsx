import React, { useState } from 'react';
import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap';
import axios from 'axios';
import { WEB_API } from '../../config';
import { WeToast } from '../shared/weToast'

export const Report = (props) => {

    const [isSending, setIsSending] = useState(false);
    const [report, setReport] = useState('');
    const [isToast, setToast] = useState(false);

    const handleReport = () => {
        if (isSending) return;
        if (report === '') {
            props.onHide();
            return;
        }
        const request = {
            description: report
        }
        const sendReport = async () => {
            setIsSending(true);
            await axios.post(`${WEB_API}/api/report/create`, request)
                .then(res => {
                    setToast(true);
                    props.onHide();
                })
                .catch(err => {
                    console.log(err.response);
                })

            setIsSending(false);
        }

        sendReport();
        props.onHide();

    }

    return(
        <div className='rounded-circle'>
            <Modal
                {...props}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                
            >
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h5>Gửi phản hồi đến đội ngũ phát triển</h5>
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <FloatingLabel controlId="floatingTextarea2" label="Phản hồi">
                        <Form.Control
                        as="textarea"
                        placeholder="Leave a comment here"
                        style={{ height: '100px' }}
                        onChange={(e)=>setReport(e.target.value)}
                        />
                    </FloatingLabel>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='w-100' type='submit' onClick={handleReport}>Gửi</Button>
                </Modal.Footer>
            </Modal>
            <WeToast show={isToast} onClose={()=>setToast(false)}>
                Cảm ơn sự đóng góp của bạn.
            </WeToast>
        </div>
    )
}