import {React} from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import {WeLogoBgDark} from '../../assets/logo'

export const WeToast = ({position='top-end', ...props}) => {

    const {children, ...attribute} = props;

    return(
        <ToastContainer className="p-3" position={position} style={{zIndex: 1000}}>
            <Toast {...attribute} delay={2500} autohide className="d-inline-block m-1" animation>
                <Toast.Header>
                    <WeLogoBgDark style={{ height: 28, width: 28 }} rounded/>
                    <strong className="me-auto">weHome</strong>
                </Toast.Header>
                <Toast.Body>{children}</Toast.Body>
            </Toast>
        </ToastContainer>
    )
}
