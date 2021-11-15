import React from 'react';
import { BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import HomePage from '../pages/home.page';
import HostPage from '../pages/host.page';
import { Signup } from '../pages/signUp.page';
import {RoomSignUp} from '../pages/roomSignUp.page';
import { RoomEdit } from '../pages/roomEdit.page';
import { RoomManager } from '../pages/roomManager.page';
import RoomListProvider from '../context/managerRoomContext';
import RoomContextProvider from '../context/roomContext';

function Root() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/home" component={HomePage} />
                <Route path="/host" component={HostPage} />
                <Route path='/signup' component = {Signup} />
                <Route path='/roomsignup' component = {RoomSignUp} />
                <Route path='/roomedit' component = {RoomEdit} />
                <Route path='/roommanager' component = {RoomManager} />
                <div className="container mt-3">
                <div className="row">
                    <RoomListProvider>
                        <RoomContextProvider>
                            <Route path='/' element = {<Signup/>} />
                            <Route path='/roomsignup' element = {<RoomSignUp/>} />
                            <Route path='/roomedit' element = {<RoomEdit/>} />
                            <Route path='/roommanager' element = {<RoomManager/>} />
                        </RoomContextProvider>
                    </RoomListProvider>
                    </div>
                </div>
                <Redirect to="/home" />
            </Switch>
        </BrowserRouter>   
    )
}

export default Root;