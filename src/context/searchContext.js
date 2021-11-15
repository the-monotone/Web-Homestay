import React, {createContext, useReducer} from 'react';
import SearchReducer from '../reducer/searchReducer';
import * as ActionTypes from '../reducer/actionTypes';

export const SearchContext = createContext();

const initialState = {
    place: {
        description: "",
        lat: null,
        lng: null
    },
    startDate: null,
    endDate: null,
    guest: {
        adult: 0,
        child: 0,
        baby: 0
    }
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
    const changeAdultGuest = payload => {
        dispatch({type: ActionTypes.CHANGE_ADULT_GUEST, payload});
    }
    const changeChildGuest = payload => {
        dispatch({type: ActionTypes.CHANGE_CHILD_GUEST, payload});
    }
    const changeBabyGuest = payload => {
        dispatch({type: ActionTypes.CHANGE_BABY_GUEST, payload});
    }
    const contextValue = {
        changePlace,
        changeStartDate,
        changeEndDate,
        changeAdultGuest,
        changeChildGuest,
        changeBabyGuest,
        ...state
    }

    return (
        <SearchContext.Provider value={contextValue}>
            {children}
        </SearchContext.Provider>
    )
}

export default SearchContextProvider;