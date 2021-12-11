import React, { createContext, useReducer } from 'react';
import { WEB_API } from '../config';
import axios from 'axios';

export const UserContext = createContext();

const initialState = {
    userId: null,
    name: null,
    token: null
}


const UserContextProvider = ({children}) => {

    const login = (payload) => {
        return axios
            .post(`${WEB_API}/api/user/login`, payload)
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    window.location.reload();
                    return res.data;
                } else {
                    console.log("WTF")
                    const error = new Error("Sai tài khoản hoặc mật khẩu");
                    throw(error);
                }
            })
            .catch(err => {
                console.error(err);
                const error = new Error(err.message)
                throw(error);
            })
    }

    const logout = (token) => {
        return axios
            .post(`${WEB_API}/api/user/logout`, token)
            .then(res => {
                if (res.status === 200) {
                    localStorage.removeItem("user-state");
                    window.location.replace("/home");
                    return res.data;
                }
            })
            .catch(err => {
                console.error(err);
                const error = new Error(err.message)
                throw(error);
            })
    }

    const getInfo = (userId) => {
        return axios
            .get(`${WEB_API}/api/user/${userId}`)
            .then(res => {
                console.log("User res: ",res);
                return res.data;
            })
            .catch(err => {
                console.log(err);
                throw(err.response);
            })
    }

    const updateInfo = (token, payload) => {
        return axios.put(`${WEB_API}/api/user/${payload.user_id}`, payload,{
            headers: {
                "Authorization": `Bearer ${token}`
            }})
            .then(res => {
                return res;
            })
            .catch(err => {
                throw(err.response);
            })
    }

    const changePassword = (user_id, token, payload) => {
        const body = {
            oldPassword: payload.currentPassword,
            password: payload.newPassword
        };
        console.log(user_id,token, body);
        return axios.post(`${WEB_API}/api/user/${user_id}/change-password`, body,{
            headers: {
                "Authorization": `Bearer ${token}`
            }})
            .then(res => {
                return res;
            })
            .catch(err => {
                throw(err.response);
            })
    }

    const signUp = (payload) => {
        console.log(payload);
        return axios.post(`${WEB_API}/api/user/create`, payload)
            .then(res => res.data)
            .catch(err => {throw(err.response)})
    }


    const userContextData = {
        login,
        logout,
        getInfo,
        updateInfo,
        changePassword,
        signUp
    }

    return(
        <UserContext.Provider value={userContextData}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;