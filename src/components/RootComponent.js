import React from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import Host from './HostComponent';

function Root() {
    return (
        <div>
            <Header />
            <Switch>
                <Route path="/home" component={Home} />
                <Route path="/host" component={Host} />
                <Redirect to="/home" />
            </Switch>
        </div>
    )
}

export default withRouter(Root);