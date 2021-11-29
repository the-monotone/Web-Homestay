import { createContext, useReducer } from "react";
import RentalReducer from "../reducer/rentalReducer";
import {Rental} from '../Fake Data API/roomData';
import { GET_RENTAL } from "../reducer/actionTypes";

export const RentalContext = createContext();

const initialState = {
    rental: [],
}

const RentalContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(RentalReducer, initialState);

    const getRental = () => {
        dispatch({type: GET_RENTAL, payload: Rental});    
    }

    const value = {
        getRental,
        ...state
    }

    return (
        <RentalContext.Provider value={value}>
            {children}
        </RentalContext.Provider>
    )
}

export default RentalContextProvider;