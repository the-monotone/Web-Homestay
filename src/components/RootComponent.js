import React from 'react';
import { BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import Header from './header/HeaderComponent';
import Home from './HomeComponent';
import Host from './HostComponent';

function Root() {
    return (
        <BrowserRouter>
            <Header />
            <Switch>
                <Route path="/home" component={Home} />
                <Route path="/host" component={Host} />
                <Redirect to="/home" />
            </Switch>
        </BrowserRouter>   
    )
}

export default Root;