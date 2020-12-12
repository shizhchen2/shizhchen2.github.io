import React from 'react'
import {NavLink,Switch,Route,Redirect} from 'react-router-dom'
import About from '../views/about'
import Home from '../views/home'
export default class App extends React.Component{

    render(){
        return(
            <div>
                <div className="row">
                    <div className="col-xs-offset-2 col-xs-8">
                        <div className="page-header">
                            <h2>React Router Demo</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-offset-2 col-xs-2">
                        <div className="list-group">
                            <NavLink className="list-group-item activeClass"to='/about'>About</NavLink>
                            <NavLink to='/home' className="list-group-item">Home</NavLink>
                            {/*<a className="list-group-item activeClass" aria-current="true" href='/about'>About</a>*/}
                            {/*<a className="list-group-item" aria-current="true" href='/home'>Home</a>*/}
                        </div>
                    </div>
                    <div className="col-xs-6">
                        <div className="panel">
                            <div className="panel-body">
                                <Switch>
                                    <Route path='/about' component={About}/>
                                    <Route path='/Home' component={Home}/>
                                    <Redirect to='/about'/>
                                </Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

