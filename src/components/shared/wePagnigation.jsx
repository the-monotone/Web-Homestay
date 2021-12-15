import {React} from 'react';
import { Pagination } from 'react-bootstrap';


export const WePagination = (props) => {
    const {total, currentPage, setCurrentPage, itemPerPage, isGetting} = props;

    var items = [];
    var showItems = [];

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

        const prevItems = 4;
        const nextItems = 4;

        const firstIndex = (((currentPage - prevItems) > 0) ? (currentPage - prevItems) : 1);
        const endIndex = (((currentPage + nextItems) <= items.length) ? (currentPage + nextItems) : items.length);
        if(firstIndex > 4) showItems.push(<Pagination.Ellipsis key={'prev-ellipsis'}/>)
        for (let i = firstIndex; i <= endIndex ; i++ )
            showItems.push(items[i-1])
        if (endIndex < items.length) showItems.push(<Pagination.Ellipsis key={'next-ellipsis'}/>)

    return(
        <Pagination style={{"justifyContent": "center"}}>
            <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1 || isGetting}/>
            <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1 || isGetting}/>
            {showItems}
            <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === items.length  || isGetting}/>
            <Pagination.Last onClick={() => setCurrentPage(items.length)} disabled={currentPage === items.length  || isGetting}/>
        </Pagination>
    )
}