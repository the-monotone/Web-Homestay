import { CHANGE_PASSWORD, GET_USER, SIGN_UP, USER_UPDATE, USER_UPDATE_INFO } from "./actionTypes";
import { WEB_API } from "../config";
import axios from "axios";


const userReducer = (state, action) => {
    const {type, payload} = action

    switch(type) {
        case SIGN_UP:
        {
            let cloneUser = state;
            const user = {
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

export default userReducer;