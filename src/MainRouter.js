import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './core/Home';
import Signup from './user/Signup';
import Signin from './user/Signin';


const MainRouter = () => (
    <div>
        {/* This allows for switching between components when we navigate to different URLs. */}
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/signup" component={Signup}/>
            <Route exact path="/signin" component={Signin}/>
        </Switch>
    </div>
)

export default MainRouter;
