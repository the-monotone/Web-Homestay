import { CHANGE_PASSWORD, GET_USER, LOG_OUT, SIGN_IN, SIGN_UP, USER_UPDATE, USER_UPDATE_INFO, WEB_API } from "./actionTypes";
import axios from "axios";


export const userReducer = (state, action) => {
    const {type, payload} = action



    switch(type) {
        case SIGN_IN:
            return state;
        case SIGN_UP:
        {
            let cloneUser = state;
            const user = {
                userID: 0,
                name: payload.firstName + ' ' + payload.lastName,
                phone: payload.phone,
                email: payload.email,
                userType: payload.userType,
                username: payload.username,
                password: payload.password
            }
            axios.post(`${WEB_API}/api/user/create`, user)
                .then(res => {
                    console.log(res);
                    cloneUser = user;
                })
                .catch(err => console.log(err))
            return cloneUser;
        }
        case LOG_OUT:
            return state;
        case GET_USER:
            return state;
        case USER_UPDATE_INFO:
        {
            let user = state;
            axios.post(`${WEB_API}/api/user${payload.id}`, payload)
                .then(res => {
                    console.log(res);
                    user = {...payload}
                })
                .catch(err => {
                    console.log(err);
                    alert('Cập nhật không thành công')
                })
            return user;
        }
        case CHANGE_PASSWORD:
            return state;
        default:
            return state;
    }
}