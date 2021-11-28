import React, { createContext, useReducer } from 'react';

export const UserContext = createContext();

const UserContextProvider = ({children}) => {

    const [user, dispatch] = useReducer(useReducer, null)

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