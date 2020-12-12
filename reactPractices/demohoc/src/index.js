import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router,Route,Link,Redirect,Switch} from 'react-router-dom'
import './index.css'

const routes = [
    {
      path: "/",
      exact: true,
      sidebar: () => <div>home!</div>,
      main: () => <h2>Home</h2>
    },
    {
      path: "/bubblegum",
      sidebar: () => <div>bubblegum!</div>,
      main: () => <h2>Bubblegum</h2>
    },
    {
      path: "/shoelaces",
      sidebar: () => <div>shoelaces!</div>,
      main: () => <h2>Shoelaces</h2>
    }
  ];



const App = ()=>{
    return (
        <Router>
            <React.Fragment>
            <div className="menuContainer">

                <ul className="menu">
                    <li><Link to="/">主页</Link></li>
                    <li><Link to="/bubblegum">bl</Link></li>
                    <li><Link to="/shoelaces">sl</Link></li>
                </ul>
                {routes.map(
                    (route,index)=>
                        <Route path={route.path} exact={route.exact}
                        key={`side-bar-${index}`}
                        render={route.sidebar}
                        />
                    
                )}

                
            </div>
            <div className="main">
            {routes.map(
                    (route,index)=>
                        <Route path={route.path} exact={route.exact}
                        key={`side-bar-${index}`}
                        render={route.main}
                        />
            )}
                

            </div>
            </React.Fragment>


        </Router>
    )
}



ReactDOM.render(<App/>,document.getElementById('root'))