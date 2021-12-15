/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import {Container, Table} from 'react-bootstrap';
import { WEB_API } from '../config';
import { WePagination } from '../components/shared/wePagnigation';

export const ReportTab = () => {

    const [reports, setReports] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const [reportPerPage] = useState(12);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalReport, setTotalReport] = useState(0);

    const userState = JSON.parse(localStorage.getItem('user-state'));

    const handlePageNumber = (number) => setCurrentPage(number);

    useEffect(() => {
        if(isLoading) return;
        const getReport = async () => {
            setLoading(true);
            await axios.get(`${WEB_API}/api/report?limit=${reportPerPage}&page=${currentPage}`, {
                headers: {
                    "Authorization": `Bearer ${userState.token}`
                }
            })
                .then(res => {
                    setReports([...res.data.reports]);
                    setTotalReport(res.data.total);
                })
                .catch(err => {
                    alert('Lỗi hệ thống, thử lại sau');
                })
            setLoading(false);
        } 
        getReport();
    },[currentPage])

    return(
        <Container className = 'mt-3'>
        {
            <Table className='mb-3'striped bordered hover variant="dark">
                <thead>
                    <tr><th>Report</th></tr>
                </thead>
                <tbody>
                {
                    reports.map((report, index) => {
                        return <tr key = {index}><td>{report.description}</td></tr>
                    })
                }
                </tbody>
            
            </Table>
        }
        <WePagination 
            total = {totalReport}  
            currentPage = {currentPage} 
            itemPerPage = {reportPerPage} 
            setCurrentPage = {handlePageNumber}
            isGetting = {isLoading}
            />
        </Container>
    )

}