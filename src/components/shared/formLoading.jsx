import React from 'react';
import { Placeholder, Row } from 'react-bootstrap';
import "./loadingCard.css";

export const LoadingForm = () => {
    // const url = "https://i.ibb.co/2MDV6nN/form-loading.gif";
    return(
        <Row style={{ height: '300px' }} className='ms-1'>
            <Placeholder as='p' xs={6} className='mb-2' bg='secondary'/>
            <Placeholder xs={12} style={{ height: '30px' }} bg='secondary' className='mb-3'/>
            <Placeholder as='p' xs={6} className='mb-2' bg='secondary'/>
            <Placeholder xs={12} style={{ height: '30px' }} bg='secondary' className='mb-3'/>
            <Placeholder as='p' xs={6} className='mb-2' bg='secondary'/>
            <Placeholder xs={12} style={{ height: '30px' }} bg='secondary' className='mb-3'/>
            <Placeholder.Button variant='danger' style={{ width: '50px' }} className='me-2'/>
            <Placeholder.Button variant='secondary' style={{ width: '50px' }}/>
        </Row>
    )
}