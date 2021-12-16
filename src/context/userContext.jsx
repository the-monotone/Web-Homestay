import React, { createContext } from 'react';
import { WEB_API } from '../config';
import axios from 'axios';

export const UserContext = createContext();

const UserContextProvider = ({children}) => {

    const login = (payload) => {
        return axios
            .post(`${WEB_API}/api/user/login`, payload)
            .then(res => {
                return res.data;
            })
            .catch(err => {
                console.error(err);
                throw(err);
            })
    }

    const logout = (token) => {
        return axios
            .post(`${WEB_API}/api/user/logout`, token)
            .then(res => {
                localStorage.removeItem("user-state");
                window.location.replace("/");
                return res.data;
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