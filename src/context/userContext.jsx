import React, { createContext, useReducer } from 'react';
import userReducer from '../reducer/userReducer';
import { WEB_API } from '../config';
import axios from 'axios';

export const UserContext = createContext();

const initialState = {
    userId: null,
    name: null,
    token: null
}


const UserContextProvider = ({children}) => {
    const [user, dispatch] = useReducer(userReducer, initialState)

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
                throw(error)
            })
    }


    const userContextData = {
        user,
        dispatch,
        login,
        logout
    }

    return(
        <UserContext.Provider value={userContextData}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;