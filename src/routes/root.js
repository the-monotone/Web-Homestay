import React from 'react';
import { BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import HomePage from '../pages/home.page';
import HostPage from '../pages/host.page';

function Root() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/home" component={HomePage} />
                <Route path="/host" component={HostPage} />
                <Redirect to="/home" />
            </Switch>
        </BrowserRouter>   
    )
}

export default Root;