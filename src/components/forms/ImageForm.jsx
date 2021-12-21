/* eslint-disable react-hooks/exhaustive-deps */
import { useField } from 'formik';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Row, Col} from 'react-bootstrap';
import './formik.css'
import { ImageCard } from '../shared/imageCard';
import Compress from 'compress.js';
export const ImageForm = ({label, isGetting, setGetting,...props}) => {
    const [field, ,helper] = useField(props);
    const [imgCompressed, setImgCompressed] = useState(null);

    const compress = new Compress();

    const [imageList, setImageList] = useState(field.value);

    useEffect(() => {
        helper.setValue([...imageList]);
    }, [imageList])

    async function resizeImageFn(file) {

        const resizedImage = await compress.compress([file], {
            size: 3, 
            quality: 0.6, 
            maxWidth: 800, 
            maxHeight: 600
        })
        const img = resizedImage[0];
        const base64str = img.data
        const imgExt = img.ext
        const resizedFile = Compress.convertBase64ToFile(base64str, imgExt)
        setImgCompressed(resizedFile);
    }

    const onChange = (e) => {

        if (isGetting) return;
        
        let file = e.target.files[0]; 
        resizeImageFn(file);
        file = imgCompressed;

        let body = new FormData();
        body.set('key', 'b1d351b87540a7a9b8bb380248e85040')
        body.append('image', file)

        const postImage = async () => {
            setGetting(true);
            await axios({
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
            setGetting(false);
        }

        postImage();

    }

    return(
        <div className = {`${props.pos} d-flex justify-content-center flex-column`} 
            {...field}
        >
            <Row className='d-flex justify-content-center'>
                <label htmlFor="image-upload-id" className="upload-image-label mb-3 w-50" disabled={isGetting}>Chọn ảnh</label>
            </Row>
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