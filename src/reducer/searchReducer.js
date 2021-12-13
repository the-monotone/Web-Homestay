import * as ActionTypes from './actionTypes';

const SearchReducer = (state, action) => {
    switch (action.type) {
        case ActionTypes.CHANGE_PLACE: {
            return {
                ...state,
                place: action.payload
            }
        } 
        case ActionTypes.CHANGE_STARTDATE: {
            return {
                ...state,
                startDate: action.payload
            }
        }
        case ActionTypes.CHANGE_ENDDATE: {
            return {
                ...state,
                endDate: action.payload
            }
        }
        case ActionTypes.CHANGE_GUEST: {
            return {
                ...state,
                guest: action.payload
            }
        }
        default: {
            return state;
        }
    }
}


export default SearchReducer;