import {React} from 'react';
import { Toast, ToastContainer, Image } from 'react-bootstrap';
import {WeLogoBgDark} from '../../logo/logo'

export const WeToast = (props) => {

    const {children, ...attribute} = props;

    return(
        <ToastContainer position='top-end'>
            <Toast {...attribute} delay={3000} autohide className="d-inline-block m-1" animation>
            <Toast.Header>
                <WeLogoBgDark style={{ height: 28, width: 28 }} rounded/>
                <strong className="me-auto">weHome</strong>
            </Toast.Header>
            <Toast.Body>{children}</Toast.Body>
            </Toast>
        </ToastContainer>
    )
}
