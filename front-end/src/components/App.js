import React, { Suspense } from 'react';
import {
    Switch, Route
} from "react-router-dom";
import LandingPage from "./views/LandingPage/LandingPage";
import Auth from '../hoc/auth';

import NavBar from './views/NavBar/NavBar';
import LoginPage from './views/LoginPage/LoginPage';
import SignupPage from './views/SignupPage/SignupPage';
import PostPage from './views/PostPage/PostPage';

function App() {
    return (
        <Suspense fallback={(<div>Loading...</div>)}>
            <NavBar />
            <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
               <Switch> 
                   <Route exact path="/" component={Auth(LandingPage, null)} />
                   <Route exact path="/login" component={Auth(LoginPage, false)} />
                   <Route exact path="/signup" component={Auth(SignupPage, false)} />
                   <Route exact path="/post" component={Auth(PostPage, null)} />
                </Switch> 
            </div>
        </Suspense>
    )
}

export default App