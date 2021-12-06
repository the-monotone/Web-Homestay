import {
    GET_CURRENTLY_HOSTING_ROOMS,
    GET_CHECKING_OUT_ROOMS,
    GET_EMPTY_ROOMS
} from './actionTypes';

import axios from 'axios';
import { WEB_API } from '../config';


export const roomListReducer = (state, action) => {
    const {type, payload} = action

    switch(type) {
        case GET_CHECKING_OUT_ROOMS:
        {
            const request = {
                hostID: 4,
                filter: GET_CHECKING_OUT_ROOMS
            }
            axios.post(`${WEB_API}/api/room/filter`, request)
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                })
            return;
        }
        case GET_EMPTY_ROOMS:
        {
            const request = {
                hostId: 4,
                filter: "Empty"
            }
            var rooms = [];
            const getApi = async () => {
                let _rooms = [];
                await axios.post(`${WEB_API}/api/room/filter`, request)
                    .then(res => {
                        console.log(res);
                        _rooms = [...res.data]; 
                    })
                    .catch(err => {
                        console.log(err);
                    })
                return _rooms
            }
            rooms = getApi();
            console.log(rooms);
            return rooms;
        }

        default:
            return state;
    }
}