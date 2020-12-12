import React,{Fragment} from 'react'
import ReactDOM from 'react-dom'


import { BrowserRouter as Router, Route, Redirect,Link,withRouter } from "react-router-dom";
import AuthButton from './components/AuthButton';
import NavMenu from './components/NavMenu';
import Public from './components/pages/Public';
import Login from './components/pages/Login';
import Protect from './components/pages/Protect';
import PrivateRouter from './components/PrivateRoute'
const LoginApp = ()=>{
    return (
        <Router>
            <Fragment>
                <AuthButton />
                <NavMenu />
                <Route path="/public" component={Public} />
                <Route path="/login" component={Login} />
                <PrivateRouter path="/protect" component={Protect} />
            </Fragment>
        </Router>
    )
}

export default LoginApp;