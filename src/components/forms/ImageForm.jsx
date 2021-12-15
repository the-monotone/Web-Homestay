/* eslint-disable react-hooks/exhaustive-deps */
import { useField } from 'formik';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Row, Col} from 'react-bootstrap';
import './formik.css'
import { ImageCard } from '../shared/imageCard';

export const ImageForm = ({label, ...props}) => {
    const [field, ,helper] = useField(props);

    const [imageList, setImageList] = useState(field.value);

    useEffect(() => {
        helper.setValue([...imageList]);
    }, [imageList])

    const onChange = (e) => {
        
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
        <div className = {`${props.pos} d-flex justify-content-center flex-column`} 
            {...field}
        >
            <Row className='d-flex justify-content-center'><label htmlFor="image-upload-id" className="upload-image-label mb-3 w-50">Chọn ảnh</label></Row>
            <input 
                type="file"
                name = "image_upload"
                id = "image-upload-id"
                autoComplete="off"
                onChange = {onChange}
                hidden
            />
            <Row className='overflow-auto w-100' style={{height:'320px'}}>
            {
                imageList.map((image,i) => {
                    return (
                    <Col md={6} key={i} className='d-flex justify-content-center'> 
                        <ImageCard imgUrl={image} setValue = {setImageList} className = "room-image img-fluid" />
                    </Col>)
                })
            }
            </Row>
        </div>
    )
}