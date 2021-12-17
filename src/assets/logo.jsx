import React from 'react';
import { Image } from 'react-bootstrap';

import WeHomeLogo from './onlyLogo.svg';
import WeHomeLogoBgDark from './weHomeLogo.svg';
import WeBranch from './logoandbrand.svg';

export const WeLogo = (props) => {
    return (
        <Image
            src={WeHomeLogo}  
            alt=""
            style={{ height: 60, width: 60 }}
            className='me-2'
            {...props}
            />
    )
}

export const WeLogoBgDark = (props) => {
    return (
        <Image
            src={WeHomeLogoBgDark}  
            alt=""
            style={{ height: 30, width: 30 }}
            className='me-2'
            {...props}
            />
    )
}
export const WeLogoBranch = (props) => {
    return (
        <Image
            src={WeBranch}  
            alt=""
            style={{ height: 30, width: 30 }}
            className='me-2'
            {...props}
            />
    )
}
