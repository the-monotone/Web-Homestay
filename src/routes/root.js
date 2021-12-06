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

function Root() {
    return (
        <Router>
            <Routes>
<<<<<<< HEAD
                <Route path="/" element={<Layout/>}>
                    <Route index element={<HomePage/>} />
                    <Route path="/host" element={<HostPage/>} />
                    <Route path="/search" element={<SearchResultPage />} />
                    <Route path='/roomsignup' element = {<RoomSignUp/>} />
                    <Route path='/roommanager' element = {<RoomManager/>} />
                    <Route path='/accountsettings' element = {<AccountSettings/>} />
                    <Route path="/room">
                        <Route path=":roomId" element={<RoomViewPage />} />
=======
                <Route path="/" element={<HomePage/>} />
                <Route path="/home" element={<HomePage/>} />
                <Route path="/host" element={<HostPage/>} />
                <Route path="/search" element={<SearchResultPage />} />
                <Route path='/roomsignup' element = {<RoomSignUp/>} />
                <Route path='/roomedit' element = {<RoomEdit/>} />
                <Route path='/roommanager' element = {<RoomManager/>} />
                <Route path='/accountsettings' element = {<AccountSettings/>} />
                <Route path="/room">
                    <Route path=":roomId" element={<RoomViewPage />} />
                </Route>
                <Route path="/rental">
                    <Route path="/rental/user">
                        <Route path=":userId" element={<RentalViewPage />} />
>>>>>>> 0d2502a30d87c709218fd6cc6dd4d7beaf936057
                    </Route>
                </Route>
            </Routes>
        </Router>   
    )
}

export default Root;