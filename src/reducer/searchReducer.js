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
        case ActionTypes.CHANGE_ADULT_GUEST: {
            const newGuest = {
                ...state.guest, 
                adult: action.payload
            }
            return {
                ...state,
                guest: {
                    ...newGuest
                }
            }
        }
        case ActionTypes.CHANGE_CHILD_GUEST: {
            const newGuest = {
                ...state.guest,
                child: action.payload
            }
            return {
                ...state,
                guest: {
                    ...newGuest
                }
            }
        }
        case ActionTypes.CHANGE_BABY_GUEST: {
            const newGuest = {
                ...state.guest,
                baby: action.payload
            }
            return {
                ...state,
                guest: {
                    ...newGuest
                }
            }
        }
        default: {
            return state;
        }
    }
}


export default SearchReducer;