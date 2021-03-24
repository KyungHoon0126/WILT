import React, { Suspense } from 'react';
import {
    Switch, Route
} from "react-router-dom";
import LandingPage from "./views/LandingPage/LandingPage";
import Auth from '../hoc/auth';

import NavBar from './views/NavBar/NavBar';

function App() {
    return (
        <Suspense fallback={(<div>Loading...</div>)}>
            <NavBar />
            <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
               <Switch> 
                   <Route exact path="/" component={Auth(LandingPage, null)} />
                </Switch> 
            </div>
        </Suspense>
    )
}

export default App