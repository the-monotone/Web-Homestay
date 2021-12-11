import { createContext, useReducer } from "react";
import RentalReducer from "../reducer/rentalReducer";
import { GET_RENTAL } from "../reducer/actionTypes";
import { WEB_API } from "../config";
import axios from "axios";

export const RentalContext = createContext();

const initialState = {
    rental: [],
}

const RentalContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(RentalReducer, initialState);

    const getRental = (token, userId) => {
        if (token == null || userId == null) {
            return null;
        }
        return axios
            .get(`${WEB_API}/api/rental/user/${userId}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(res => {
                console.log(res.data);
                dispatch({type: GET_RENTAL, payload: res.data});
            })
            .catch(err => {
                throw(err.response);
            })
    }

    const postRental = (token, payload) => {
        return axios
            .post(`${WEB_API}/api/rental/create`, payload, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(res => {
                console.log(res);
                return res.data;
            })
            .catch(err => {
                throw(err.response);
            })
    }

    const getRentalByHost = (token, hostId, status, currentPage, rentalPerPage) => {
        if (token == null || hostId == null) {
            return null;
        }
        const request = {
            status
        }
        return axios
            .post(`${WEB_API}/api/rental/host/filter?limit=${rentalPerPage}&page=${currentPage}`, request, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(res => {
                return (res.data);
            })
            .catch(err => {
                throw(err.response);
            })
    }

    const updateRental = (token, payload) => {
        if (token == null) {
            return null;
        }
        const {rental_id, ...request} = payload;
        console.log(rental_id, request);
        return axios
            .put(`${WEB_API}/api/rental/${rental_id}`, request, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(res => {
                return res;
            })
            .catch(err => {
                throw(err.response);
            })
    }

    const value = {
        getRental,
        postRental,
        getRentalByHost,
        updateRental,
        ...state
    }



    return (
        <RentalContext.Provider value={value}>
            {children}
        </RentalContext.Provider>
    )
}

export default RentalContextProvider;