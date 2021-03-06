import React, { createContext, useState } from 'react';

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