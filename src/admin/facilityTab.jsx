/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import { TextField } from '../components/forms/TextField';
import * as Yup from 'yup';
import axios from 'axios';
import { WEB_API } from '../config';
import { WeToast } from '../components/shared/weToast';
import { WePagination } from '../components/shared/wePagnigation';



const userState = JSON.parse(localStorage.getItem('user-state'));

export const FacilitiesTab = () => {

    const [dataChange, setDataChange] = useState(false);

    return(
        <Container className='mt-3'>
            <AddFacility dataChange={dataChange} setDataChange={setDataChange}/>
            <ShowFacilities dataChange={dataChange} setDataChange={setDataChange}/>
        </Container>
    )
}

export const ShowFacilities = ({dataChange, setDataChange}) => {

    const [facilities, setFacilities] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const [facilityPerPage] = useState(12);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalFacility, setTotalFacility] = useState(0);

    const [isDeleteToast, setDeleteToast] = useState(false);

    const userState = JSON.parse(localStorage.getItem('user-state'));

    const handlePageNumber = (number) => setCurrentPage(number);

    const removeFacility = (_facility) => {
        const clone = facilities.filter(facility => facility.facility !== _facility)
        setFacilities([...clone]);
    }

    const handleDeleteFacility = (e) => {
        if (isLoading) return;
        const deleteFacility = async () => {
            setLoading(true);
            const request = {
                facilities: [facilities[parseInt(e.target.id)].facility]
            }
            await axios.post(`${WEB_API}/api/facility/delete`, request, {
                headers: {
                    "Authorization": `Bearer ${userState.token}`
                }
            })
                .then(res => {
                    setDataChange(!dataChange);
                    setDeleteToast(true);
                    removeFacility(request.facilities[0]);
                })
                .catch(err => {
                    alert('Lỗi hệ thống, thử lại sau');
                })
            setLoading(false);
        }
        deleteFacility();   
    }

  

    useEffect(() => {
        if(isLoading) return;
        const getFacility = async () => {
            setLoading(true);
            await axios.get(`${WEB_API}/api/facility?limit=${facilityPerPage}&page=${currentPage}`, {
                headers: {
                    "Authorization": `Bearer ${userState.token}`
                }
            })
                .then(res => {
                    setFacilities([...res.data.facilities]);
                    setTotalFacility(res.data.total);
                })
                .catch(err => {
                    alert('Lỗi hệ thống, thử lại sau');
                })
            setLoading(false);
        } 
        getFacility();
    },[currentPage, facilities,dataChange])

    return(
        <Container className = 'pt-3 pb-1'>
        {
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr className='text-center'>
                    <th>Description</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                {
                    facilities.map((report, index) => {
                        return(
                            <tr key={index} variant='dark' className='bg-dark text-white' style={{borderColor: '#373b3e'}}>
                                <td style={{width: '90%'}}>
                                    <Row className='ms-2'>{report.facility}</Row>
                                </td>
                                <td md='3' className='d-flex justify-content-center'>
                                    <Button variant='danger' onClick={handleDeleteFacility} id={index}>Delete</Button>
                                </td>
                            </tr>
                        )
                        
                    })
                }
                </tbody>
            </Table>
        }
        <WePagination 
            total = {totalFacility}  
            currentPage = {currentPage} 
            itemPerPage = {facilityPerPage} 
            setCurrentPage = {handlePageNumber}
            isGetting = {isLoading}
            />
        <WeToast
            show={isDeleteToast}
            onClose={()=>setDeleteToast(false)}
        >
            Delete Success
        </WeToast>

        </Container>
    )
}

export const AddFacility = ({dataChange, setDataChange}) => {

    const[isToast, setToast] = useState(false);

    const handleSubmit = (value) => {
        if(value.facility === '' || !value.facility) return;
        const createFacility = async () => {
            const request = {
                facilities: [{...value, description: ''}]
            }
            await axios.post(`${WEB_API}/api/facility/create`, request,{
                headers: {
                    "Authorization": `Bearer ${userState.token}`
                }
            })
                .then(res => {
                    setToast(true);
                    setDataChange(!dataChange);
                })
                .catch(err => {
                    alert('Lỗi hệ thống, thử lại sau');
                })
        }
        createFacility();
    }

    const validate = Yup.object({
        facility: Yup.string()
                    .max(50, 'Max 50 character')
    })
    
    return(
        <Container className=''>
            <Formik
                initialValues={{
                    facility: '',
                }}
                validationSchema={validate}
                onSubmit = {handleSubmit}
            >
                {formik => (
                    <Form>
                        <Row className='w-100'>
                            <Col md = '11'><TextField placeholder="Facilitiy" name="facility" type="text"    errStyle={{color: 'white'}}/></Col>
                            <Col md= '1'><Button variant='warning' type="submit">Add</Button></Col>
                        </Row>
                    </Form> 
                )}
            </Formik>
            <WeToast
                show={isToast}
                onClose={()=>setToast(false)}
            >
                Add facility success
            </WeToast>
        </Container>
    )
}