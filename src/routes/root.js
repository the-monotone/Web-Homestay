import React from 'react';
import HomePage from '../pages/home.page';
import HostPage from '../pages/host.page';
import { RoomSignUp } from '../pages/roomSignUp.page';
import { RoomManager } from '../pages/roomManager.page';
import { AccountSettings } from '../pages/accountSetting.page';
import SearchResultPage from '../pages/searchResult.page';
import RoomViewPage from '../pages/roomView.page';
import RentalViewPage from '../pages/rentalView.page';

import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { RentalManagement } from '../pages/rentalManagement.page';

function Root() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/home" element={<HomePage/>} />
                <Route path="/host" element={<HostPage/>} >

                </Route>
                <Route path='/host/roomsignup' element = {<RoomSignUp/>} />
                <Route path='/host/roommanager' element = {<RoomManager/>} />
                <Route path='/host/rentalmanagement' element = {<RentalManagement/>} />
                <Route path="/search" element={<SearchResultPage />} />
                <Route path='/accountsettings' element = {<AccountSettings/>} />
                <Route path="/room">
                    <Route path=":roomId" element={<RoomViewPage />} />
                </Route>
                <Route path="/rental">
                    <Route path="/rental/user">
                        <Route path=":userId" element={<RentalViewPage />} />
                    </Route>
                </Route>
            </Routes>
        </Router>   
    )
}

export default Root;