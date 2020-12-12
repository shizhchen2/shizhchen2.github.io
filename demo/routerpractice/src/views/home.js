import React from 'react'
import {NavLink,Route,Switch,Redirect} from "react-router-dom";
import News from './news'
import Message from './message'
export default class Home extends React.Component {
    render() {
        return(
            <div>
                <h2>Home route</h2>
                <ul className='nav nav-tabs'>
                    <li><NavLink to='/home/news'>
                    News</NavLink></li>
                    <li><NavLink to='/home/message'>
                    Messages</NavLink></li>
                </ul>
                <div>
                    <Switch>
                        <Route path='/home/news' component={News}/>
                        <Route path='/home/message' component={Message}/>
                        <Redirect to='/home/news'/>
                    </Switch>
                </div>
            </div>
        )
    }
}