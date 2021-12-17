import React, { forwardRef, useContext, useEffect, useState } from 'react';
import { Popover } from 'react-bootstrap';
import { WeLogoBgDark } from '../../assets/logo';
import { UserContext } from '../../context/userContext';

export const WePopover = React.forwardRef(({id, ...props},ref) => {
    const {getInfo} = useContext(UserContext);
    const [info, setInfo] = useState({})

    useEffect(() => {
        getInfo(id)
            .then(res => {
                setInfo(res);
            })
    },[])

    return(
        <Popover ref={ref} {...props}>
            <Popover.Header as='h3'>
                <WeLogoBgDark style={{ height: 28, width: 28 }} rounded/>
                Thông tin liên hệ
            </Popover.Header>
            <Popover.Body>
                <div><strong>Tên</strong>: {info.name}</div>
                <div><strong>Email</strong>: {info.email}</div>
                <div><strong>Sđt</strong>: {info.phone}</div>
            </Popover.Body>
        </Popover>
    );
});