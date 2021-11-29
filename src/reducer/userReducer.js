import { CHANGE_PASSWORD, GET_USER, LOG_OUT, SIGN_IN, SIGN_UP, USER_UPDATE, USER_UPDATE_INFO } from "./actionTypes";
import { WEB_API } from "../config";
import axios from "axios";


const userReducer = (state, action) => {
    const {type, payload} = action

    switch(type) {
        case SIGN_IN:
            console.log(payload.username);
            axios.post(`${WEB_API}/api/user/login`, payload)
                .then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        var newState = {
                            ...state,
                            username: payload.username,
                            token: res.data.token
                        }
                        localStorage.setItem("user-state", JSON.stringify(newState));
                        window.location.reload();
                        return newState;
                    }
                })
                .catch(err => {
                    console.log(err);
                })
            return state;
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

export default userReducer;