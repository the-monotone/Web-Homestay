import React from 'react';
import {Image} from 'react-bootstrap'
import './imageCard.css'

export const ImageCard = (props) => {

    const {imgUrl, setValue} = props

    function deleteHandle(e) {
        setValue(prev => {
            let clone = [...prev];
            clone = clone.filter(_url => _url !== imgUrl);
            return clone;
        })
    }

    return(
        <div className="image-card mb-3">
            <i className="bi bi-x-square img-dlt-btn" onClick={deleteHandle}></i>
            <Image src={imgUrl} alt="" style={{width: "100%"}}/>
        </div>
    )
}