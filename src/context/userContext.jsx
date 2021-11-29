import React, { createContext, useReducer } from 'react';
import userReducer from '../reducer/userReducer';
export const UserContext = createContext();

const initialState = {
    username: null,
    token: null
}


const UserContextProvider = ({children}) => {
    const [user, dispatch] = useReducer(userReducer, initialState)

    const userContextData = {
        user,
        dispatch
    }

    return(
        <UserContext.Provider value={userContextData}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;