import {React, useWindowDimensions} from 'react';
import { Pagination, Row } from 'react-bootstrap';


export const WePagnigation = (props) => {
    const {total, currentPage, setCurrentPage, itemPerPage, isGetting} = props;


    let items = [];

    for (let number = 1; number <= Math.ceil(total / itemPerPage); number++) {
        items.push(
            <Pagination.Item 
                key = {number}
                active = {number === currentPage} 
                onClick = {() => setCurrentPage(number)}
                disabled = {isGetting}
            >
                {number}
            </Pagination.Item>
        );
    }

    return(
        <Pagination style={{"justifyContent": "center"}}>
            {items}
        </Pagination>
    )
}