import { useContext } from 'react';
import { RentalContext } from "../context/rentalContext";

const useRental = () => {
    const ctx = useContext(RentalContext);
    return {
        ...ctx
    }
}

export default useRental;