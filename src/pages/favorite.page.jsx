/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { ListGroup, ListGroupItem, Col, Image, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout.component';
import { RoomCard } from '../components/room/RoomCard';
import { LoadingCard } from '../components/shared/loadingCard';
import { WeToast } from '../components/shared/weToast';
import { FeedbackContext } from '../context/feedbackContext';
import { RoomContext } from '../context/roomContext';

const FavoritePage = () => {
    const {getFavorite} = useContext(FeedbackContext);
    const {readRoom} = useContext(RoomContext);
    const navigate = useNavigate();
    const [isToast, setToast] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [favoriteList, setFavoriteList] = useState([]);

    const handleClick = (roomId) => {
        navigate(`/room/${roomId}`);
    }
    useEffect(() => {
        let isActive = true;
        const userState = JSON.parse(localStorage.getItem('user-state'));
        if (userState == null) {
            if (isActive) {
                setToastMessage("Bạn chưa đăng nhập")
                setToast(true);
                return () => {
                    isActive = false;
                }
            }
        }
        setLoading(true);
        getFavorite(userState.token)
            .then(res => {
                if (res.length === 0) setLoading(false);
                for (let item of res) {
                    readRoom(item)
                        .then(res => {
                            setFavoriteList(prevState => [...prevState, res]);
                            setLoading(false);
                        })
                        .catch(err => {
                            throw(err);
                        })
                }
            })
            .catch(error => {
                if (isActive) {
                    setToastMessage("Hệ thống xảy ra lỗi. Vui lòng thử lại sau")
                    setToast(true);
                }
            })
        return () => {
            isActive = false;
        }
    }, [])
    return (
        <Layout styleName='mt-3 min-height'>
            <h1>Danh sách yêu thích</h1>
            <Row>
                <Col md='6' sm='12'>
                {
                    isLoading? <LoadingCard /> : favoriteList.length !== 0? 
                        <ListGroup>
                            {
                                favoriteList.map(room => {
                                    return (
                                        <ListGroupItem key={room.room_id} className="mb-3">
                                            <RoomCard room={room} canFavorite isFavorite onClick={() => {handleClick(room.room_id)}}/>
                                        </ListGroupItem>
                                )})  
                            }
                        </ListGroup> :
                        <p>Chưa có phòng nào được lưu</p>
                }
                </Col>
                <Col md='6' sm='0' className='mb-5 d-flex justify-content-center align-items-start'>
                    <Image src='/favorite.png' className='w-75 mt-5'/>
                </Col>
            </Row>
            <div className={isToast? "d-block position-fixed vh-100 vw-100 top-0 start-0" : "d-none"}>
                <WeToast position="bottom-start" show={isToast} onClose={() => setToast(false)}>
                    <p>{toastMessage}</p>
                </WeToast>
            </div>
        </Layout>
    )
}

export default FavoritePage;