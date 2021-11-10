import React, { Suspense } from 'react';
import {
    Switch, Route, Redirect
} from "react-router-dom";
import LandingPage from "./views/LandingPage/LandingPage";
import Auth from '../hoc/auth';

import NavBar from './views/NavBar/NavBar';
import LoginPage from './views/LoginPage/LoginPage';
import SignupPage from './views/SignupPage/SignupPage';
import PostPage from './views/PostPage/PostPage';
import NotfoundPage from './views/NotfoundPage/NotfoundPage';

function App() {
    return (
        <Suspense fallback={(<div>Loading...</div>)}>
            {/* <NavBar /> */}
            <Switch> 
                <Route exact path="/" component={Auth(LandingPage, null)} />
                <Route exact path="/login" component={Auth(LoginPage, false)} />
                <Route exact path="/signup" component={Auth(SignupPage, false)} />
                <Route exact path="/post" component={Auth(PostPage, true)} />
                <Route exact path="/notfound" component={NotfoundPage} />
                <Redirect to="/notfound" />
            </Switch>
        </Suspense>
    )
}

export default App