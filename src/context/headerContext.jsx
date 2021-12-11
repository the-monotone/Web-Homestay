import React, { Children, createContext, useState } from 'react';
import { ROOMMAGSTATE } from '../reducer/actionTypes';

export const HeaderContext = createContext();

const HeaderContextProvider = ({children})=> {
    const [navState, setNavState] = useState("");
    
    const setPage = (page) => {
        setNavState(page);
    }

    const data = {
        navState,
        setPage
    }

    return(
        <HeaderContext.Provider value={data}>
            {children}
        </HeaderContext.Provider>
    )
}

export default HeaderContextProvider;