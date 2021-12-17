import React from 'react';
import Banner from './chuyendi-banner.svg'
import {Image} from 'react-bootstrap'

export const RentalBanner = (props) => {
    return(
        <Image
            src={Banner}
            {...props}
            alt=''
            {...props}
        />
    )

}