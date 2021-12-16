import React from 'react';
import HomePage from '../pages/home.page';
import { RoomSignUp } from '../pages/roomSignUp.page';
import { RoomManager } from '../pages/roomManager.page';
import { AccountSettings } from '../pages/accountSetting.page';
import SearchResultPage from '../pages/searchResult.page';
import RoomViewPage from '../pages/roomView.page';
import RentalViewPage from '../pages/rentalView.page';
import RentalDetailPage from '../pages/rentalDetail.page';
import FavoritePage from '../pages/favorite.page';
import { RentalManagement } from '../pages/rentalManagement.page';
import { AdminPage } from '../admin/admin.page';

import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';

function Root() {
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="home" element={<HomePage/>} />
                <Route path='host/roomsignup' element = {<RoomSignUp/>} />
                <Route path='host/roommanager' element = {<RoomManager/>} />
                <Route path='host/rentalmanagement' element = {<RentalManagement/>} />
                <Route path="search" element={<SearchResultPage />} />
                <Route path='accountsettings' element = {<AccountSettings/>} />
                <Route path="room">
                    <Route path=":roomId" element={<RoomViewPage />} />
                </Route>
                <Route path="rental">
                    <Route path="user">
                        <Route path=":userId" element={<RentalViewPage />} />
                    </Route>
                    <Route path=":rentalId" element={<RentalDetailPage />} />
                </Route>
                <Route path="favorite" element={<FavoritePage />} />
                <Route path="onlyadmincanseethis" element={<AdminPage/>}/>
            </Routes>
        </Router>   
    )
}

export default Root;