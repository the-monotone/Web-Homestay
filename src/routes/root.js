import React from 'react';
import HomePage from '../pages/home.page';
import HostPage from '../pages/host.page';
import { Signup } from '../pages/signUp.page';
import {RoomSignUp} from '../pages/roomSignUp.page';
import { RoomEdit } from '../pages/roomEdit.page';
import { RoomManager } from '../pages/roomManager.page';

import 'bootstrap-icons/font/bootstrap-icons.css';

import {
    BrowserRouter as Router,
    Route,
    Routes
  } from "react-router-dom";
import Layout from '../components/layout.component';

function Root() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<HomePage/>} />
                    <Route path="/host" element={<HostPage/>} />
                    <Route path='/signup' element = {<Signup/>} />
                    <Route path='/roomsignup' element = {<RoomSignUp/>} />
                    <Route path='/roomedit' element = {<RoomEdit/>} />
                    <Route path='/roommanager' element = {<RoomManager/>} />
                </Routes>
            </Layout>
        </Router>   
    )
}

export default Root;