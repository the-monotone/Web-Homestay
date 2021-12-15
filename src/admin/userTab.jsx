/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Row, Col, Button, Container, Table} from 'react-bootstrap'
import { WePagination } from '../components/shared/wePagnigation';
import { WeToast } from '../components/shared/weToast';
import { WEB_API } from '../config';
import { Formik, Form } from 'formik';
import { TextField } from '../components/forms/TextField';
import * as Yup from 'yup'


export const UserListItem = ({user, isLoading, setLoading, removeUser, setToast}) => {

    const userState = JSON.parse(localStorage.getItem('user-state'));

    const handleDeleteUser = () => {
        if(isLoading) return;
        const deleteUser = async () => {
            setLoading(true);
            await axios.delete(`${WEB_API}/api/user/${user.user_id}`, {
                headers: {
                    "Authorization": `Bearer ${userState.token}`
                }
            })
                .then(res => {
                    setToast(true);
                    removeUser(user.user_id);
                })
                .catch(err => {
                    console.log(err);
                    alert('System Error. Change later');
                })
            setLoading(false);
        }

        deleteUser();
    }

    return(
        <tr>
            <td >{user.user_id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td className='text-center'><Button variant='danger' onClick={handleDeleteUser} id={user.user_id}>Delete</Button></td>
        </tr>
    )
}

export const UserTab = () => {
    const [isLoading, setLoading] = useState(false);


    const [users, setUsers] = useState([]);
    const userState = JSON.parse(localStorage.getItem('user-state'));

    const [usersPerPage] = useState(8);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalUser, setTotalUser] = useState(0);
    const [isToast, setToast] = useState(false);
    const [isViewAll, setViewAll] = useState(true);
    const [dataChange, setDataChange] = useState(true);
    const [filterInfo,  setFilterInfo] = useState({});


    const handlePageNumber = (number) => {
        setCurrentPage(number);
        setDataChange(!dataChange);
    }

    const handleGetAll = () => {
        setCurrentPage(1);
        setViewAll(true);
        setDataChange(!dataChange);
    }

    const removeUser = (id) => {
        const clone = users.filter(user => user.user_id !== id);
        setUsers([...clone]);
    }
    const getAllUser = async () => {
        setLoading(true);
        await axios.get(`${WEB_API}/api/user?limit=${usersPerPage}&page=${currentPage}`, {
            headers: {
                "Authorization": `Bearer ${userState.token}`
            }
        })
            .then(res => {
                setUsers(res.data.users);
                setTotalUser(res.data.total);
            })
            .catch(err => {
                console.log(err);
            })
        setLoading(false);
    }

    const filterUser = async () => {
        if (!filterInfo || !(filterInfo.name || filterInfo.phone || filterInfo.email)) return;
        setLoading(true);
        await axios.post(`${WEB_API}/api/user/filter?limit=${usersPerPage}&page=${currentPage}`, filterInfo,{
            headers: {
                "Authorization": `Bearer ${userState.token}`
            }
        })
            .then(res => {
                console.log(res);
                setUsers(res.data.users);
                setTotalUser(res.data.total);
            })
            .catch(err => {
                console.log(err.response);
                alert("System Error. Change later")
            })
        setLoading(false);
    }

    useEffect(() => {
        if(isLoading) return;
        isViewAll ? getAllUser() : filterUser(filterInfo);
    },[dataChange, isViewAll])

    const handleSubmit = (value) => {
        setCurrentPage(1);
        setFilterInfo(value);
        setViewAll(false);
        setDataChange(!dataChange);
    }

    const validate = Yup.object({
        name: Yup.string().max(50,'Max 50 character'),
        email: Yup.string().email('Wrong format').max(50, 'Max 50 character'),
        phone: Yup.number()
            .typeError("Must be number")
            .positive("Must be positive")
            .integer("Must be number")
    })
    return(
        <Container className='mt-3'>
            <Formik
                initialValues={{
                    name: '',
                    phone: '',
                    email: '',
                }}
                validationSchema={validate}
                onSubmit = {handleSubmit}
            >
                {formik => (
                    <Form>
                        <Row className='w-100 d-flex justify-content-center'>
                            <Col><Button variant='success' onClick={handleGetAll} type='reset'>All</Button></Col>
                            <Col md = '4'><TextField placeholder="Name" name="name" type="text" errStyle={{color: 'white'}}/></Col>
                            <Col md = '3'><TextField placeholder="Email" name="email" type="text" errStyle={{color: 'white'}}/></Col>
                            <Col md = '3'><TextField placeholder="Phone" name="phone" type="text" errStyle={{color: 'white'}}/></Col>
                            <Col md= '1'><Button variant='warning' type="submit">Filter</Button></Col>
                        </Row>
                    </Form> 
                )}
            </Formik>

            <Container>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr className='text-center'>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th style={{width:'10%'}}></th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        users.map(user => (
                        <UserListItem 
                            key = {user.user_id} 
                            user = {user} 
                            isLoading={isLoading} 
                            setLoading={setLoading}
                            removeUser={removeUser}
                            setToast={setToast}/>
                        ))}
                    </tbody>
                </Table>
                <WePagination
                    total = {totalUser}  
                    currentPage = {currentPage} 
                    itemPerPage = {usersPerPage} 
                    setCurrentPage = {handlePageNumber}
                    isGetting = {isLoading}
                />
                <WeToast
                    show={isToast}
                    onClose={() => setToast(false)}
                >
                    Delete Success
                </WeToast>
            </Container>
            
        </Container>
    )
}