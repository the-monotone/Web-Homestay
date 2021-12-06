import * as ActionTypes from './actionTypes';
const RentalReducer = (state, action) => {
    const {type, payload} = action;
    switch (type) {
        case ActionTypes.GET_RENTAL: 
            return {
                ...state,
                rental: payload
            };
        default:
            return state;
    }
}

export default RentalReducer;