import React from 'react';
import HomePage from '../pages/home.page';
import HostPage from '../pages/host.page';
import { Signup } from '../pages/signUp.page';
import { RoomSignUp } from '../pages/roomSignUp.page';
import { RoomEdit } from '../pages/roomEdit.page';
import { RoomManager } from '../pages/roomManager.page';
import { AccountSettings } from '../pages/accountSetting.page';
import SearchResultPage from '../pages/searchResult.page';
import RoomViewPage from '../pages/roomViewPage';
import {
    BrowserRouter as Router,
    Route,
    Routes
} from "react-router-dom";
import Layout from '../components/layout.component';


import 'bootstrap-icons/font/bootstrap-icons.css';

function Root() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<HomePage/>} />
                    <Route path="/host" element={<HostPage/>} />
                    <Route path="/search" element={<SearchResultPage />} />
                    <Route path='/roomsignup' element = {<RoomSignUp/>} />
                    <Route path='/roomedit' element = {<RoomEdit/>} />
                    <Route path='/roommanager' element = {<RoomManager/>} />
                    <Route path='/accountsettings' element = {<AccountSettings/>} />
                    <Route path="/room">
                        <Route path=":roomId" element={<RoomViewPage />} />
                    </Route>
                   
                </Routes>
            </Layout>
        </Router>   
    )
}

export default Root;