import { useContext } from 'react';
import { SearchContext } from "../context/searchContext";

const useSearch = () => {
    const ctx = useContext(SearchContext);
    return {
        ...ctx
    }
}

export default useSearch;