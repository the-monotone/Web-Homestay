import React from 'react';
import { BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import HomePage from '../pages/home.page';
import HostPage from '../pages/host.page';
import SearchPage from '../pages/search.page';

function Root() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/home" component={HomePage} />
                <Route path="/host" component={HostPage} />
                <Route path="/search" component={SearchPage} />
                <Redirect to="/home" />
            </Switch>
        </BrowserRouter>   
    )
}

export default Root;