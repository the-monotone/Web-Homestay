import { Formik, Form } from 'formik';
import React from 'react';
import { Modal } from 'react-bootstrap';
import { NumField } from './forms/NumField';
import { TextField } from './forms/TextField';

import * as Yup from 'yup';

const RateModal = (props) => {
    const validation = Yup.object({
        rating: Yup.number()
            .required("Bắt buộc"),
        comment: Yup.string()
            .required("Bắt buộc")
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(event);
    }

    return (
        <Modal {...props}>
            <Modal.Header closeButton>
                <Modal.Title>Đánh giá</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik 
                    initialValues={{
                        rating: null,
                        comment: ""
                    }}
                    validationSchema={validation}
                    onSubmit={handleSubmit}
                >
                    {
                        formik => (
                            <Form>
                                <NumField label="Rating" name="rating"/>
                                <TextField label="Comment" type="textarea" rows="12" name="comment" /> 
                            </Form>
                        )

                    }
                </Formik>
            </Modal.Body>
        </Modal>
    )
}

export default RateModal;