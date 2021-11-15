import React from 'react';
// import { BrowserRouter, Router, Redirect, Route, Switch, Routes} from 'react-router-dom';
import HomePage from '../pages/home.page';
import HostPage from '../pages/host.page';
import { Signup } from '../pages/signUp.page';
import {RoomSignUp} from '../pages/roomSignUp.page';
import { RoomEdit } from '../pages/roomEdit.page';
import { RoomManager } from '../pages/roomManager.page';
import RoomListProvider from '../context/managerRoomContext';
import RoomContextProvider from '../context/roomContext';

import {
    BrowserRouter as Router,
    Route,
    Routes
  } from "react-router-dom";

function Root() {
    return (
        <Router>
        <div className="container mt-3">
            <div className="row">
                <RoomListProvider>
                    <RoomContextProvider>
                        <Routes>
                            <Route path="/home" element={<HomePage/>} />
                            <Route path="/host" element={<HostPage/>} />
                            <Route path='/signup' element = {<Signup/>} />
                            <Route path='/roomsignup' element = {<RoomSignUp/>} />
                            <Route path='/roomedit' element = {<RoomEdit/>} />
                            <Route path='/roommanager' element = {<RoomManager/>} />
                        </Routes>
                    </RoomContextProvider>
                </RoomListProvider>
            </div>
        </div>

        </Router>   
    )
}

export default Root;