import { createContext } from "react";
import { WEB_API } from "../config";
import axios from "axios";

export const RentalContext = createContext();

const RentalContextProvider = ({children}) => {
    const getRental = (token, userId) => {
        return axios
            .get(`${WEB_API}/api/rental/user/${userId}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(res => res.data)
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
                return res.data;
            })
            .catch(err => {
                throw(err.response);
            })
    }

    const getRentalById = (token, rentalId) => {
        return axios
            .get(`${WEB_API}/api/rental/${rentalId}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(res => {
                return res.data;
            })
            .catch(err => {
                throw(err);
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
        updateRental,
        postRental,
        getRentalByHost,
        getRentalById
    }



    return (
        <RentalContext.Provider value={value}>
            {children}
        </RentalContext.Provider>
    )
}

export default RentalContextProvider;