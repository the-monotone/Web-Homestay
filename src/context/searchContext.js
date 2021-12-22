import React, {createContext, useState} from 'react';
import axios from 'axios';
import { WEB_API } from '../config';

export const SearchContext = createContext();

const SearchContextProvider = ({children}) => {
    const searchPlaceApi = payload => {
        return axios
            .post(`${WEB_API}/api/room/search`, payload)
            .then(res => res.data)
            .catch(error => {
                throw(error);
            })
    }

    const [searchBarOnViewport, setOnViewport] = useState(false);

    const contextValue = {
        searchPlaceApi,
        searchBarOnViewport,
        setOnViewport,
    }

    return (
        <SearchContext.Provider value={contextValue}>
            {children}
        </SearchContext.Provider>
    )
}

export default SearchContextProvider;