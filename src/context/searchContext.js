import React, {createContext, useReducer} from 'react';
import SearchReducer from '../reducer/searchReducer';
import * as ActionTypes from '../reducer/actionTypes';
import axios from 'axios';
import { WEB_API } from '../config';

export const SearchContext = createContext();

const initialState = {
    place: {
        description: "",
        lat: null,
        lng: null
    },
    startDate: null,
    endDate: null,
    guest: 0,
};

const SearchContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(SearchReducer, initialState);
    const changePlace = payload => {
        dispatch({type: ActionTypes.CHANGE_PLACE, payload});
    }
    const changeStartDate = payload => {
        dispatch({type: ActionTypes.CHANGE_STARTDATE, payload});
    }
    const changeEndDate = payload => {
        dispatch({type: ActionTypes.CHANGE_ENDDATE, payload});
    }
    const changeGuest = payload => {
        dispatch({type: ActionTypes.CHANGE_GUEST, payload});
    }

    const searchPlaceApi = payload => {
        return axios
            .post(`${WEB_API}/api/room/search`, payload)
            .then(res => res.data)
            .catch(error => {
                console.error(error);
                throw(error);
            })
    }

    const contextValue = {
        changePlace,
        changeStartDate,
        changeEndDate,
        changeGuest,
        searchPlaceApi,
        ...state
    }

    return (
        <SearchContext.Provider value={contextValue}>
            {children}
        </SearchContext.Provider>
    )
}

export default SearchContextProvider;