import { useField } from 'formik';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Row, Col, Image, Button} from 'react-bootstrap';
import './formik.css'
import { ImageCard } from '../shared/imageCard';

export const ImageForm = ({label, ...props}) => {
    const [field, ,helper] = useField(props);

    console.log("Field:", field);

    const [imageList, setImageList] = useState(field.value);

    useEffect(() => {
        helper.setValue([...imageList]);
    },[imageList])

    console.log("img list:", imageList);
    console.log("Field:", field);

    const onChange = (e) => {
        console.log("Event: ", e.target.files[0])
        
        let file = e.target.files[0]; 
        let body = new FormData();
        body.set('key', 'b1d351b87540a7a9b8bb380248e85040')
        body.append('image', file)

        axios({
            method: 'post',
            url: 'https://api.imgbb.com/1/upload',
            data: body
          })
          .then(res=>{
            
            let imgUrl = res.data.data.url;
            let tempImageList = [...imageList];
            if (imgUrl)
            tempImageList.push(imgUrl);
            setImageList(tempImageList);
            })
          .catch(Err=>console.log(Err))
    }

    return(
        <div className = {props.pos} {...field}>
            <label htmlFor="image-upload-id" className="upload-image-label mb-3">Chọn ảnh</label>
            <input 
                type="file"
                name = "image_upload"
                id = "image-upload-id"
                autoComplete="off"
                onChange = {onChange}
                hidden
            />
            <Row>
            {
                imageList.map((image,i) => {
                    return (
                    <Col xs={12} md={6} key={i}>
                        <ImageCard imgUrl={image} setValue = {setImageList} className = "room-image" />
                    </Col>)
                })
            }
            </Row>
        </div>
    )
}