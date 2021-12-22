import { useEffect } from "react";
import { useLayoutEffect } from 'react'
import { useLocation } from "react-router-dom";

export const Wrapper = ({children}) => {
    const location = useLocation();
    useEffect(() => {
      console.log('scroll called');
      window.scrollTo(0, 0);
    }, [location.pathname]);
    return children
  } 