import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter,Route,Switch} from 'react-router-dom'
import Register from './containers/register'
import Login from './containers/login'
import Main from './containers/main'
import {Provider} from 'react-redux'
import store from './redux/store'
// import './test/socket-io-test'
const Div = document.createElement('div')
Div.setAttribute('id','root')
document.body.appendChild(Div)
ReactDOM.render(
    <Provider store={store}>
    <HashRouter>
        <Switch>
            <Route path='/register' component={Register}/>
            <Route path='/login' component={Login}/>
            <Route component={Main}/>
        </Switch>
    </HashRouter>
    </Provider>
,document.getElementById('root'))