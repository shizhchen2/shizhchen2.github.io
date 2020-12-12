import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppRouter from './AppRouter';

import {BrowserRouter as Router,Route,Link} from 'react-router-dom';


function NavMenu(){
    return (
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/about">About</Link>
            </li>
            <li>
                <Link to="/topics">Topics</Link>
            </li>
        </ul>
    )
}

const Home = ()=><h2>Home</h2>
const About = ()=><h2>About</h2>
function Topics({ match }) {
    return (
      <div>
        <h2>Topics</h2>
  
        <ul>
          <li>
            <Link to={`${match.url}/components`}>Components</Link>
          </li>
          <li>
            <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
          </li>
        </ul>
  
        <Route path={`${match.path}/:id`} component={Topic} />
        <Route
          exact
          path={match.path}
          render={() => <h3>Please select a topic.</h3>}
        />
      </div>
    );
  }

  function Topic({ match }) {
    return <h3>Requested Param: {match.params.id}</h3>;
  }
  

function BasicExample(){
    return (
        <Router>
            <div>
                <NavMenu />
                <hr/>

                <Route exact path="/" component={Home}></Route> 
                <Route exact path="/about" component={About}></Route> 
                <Route path="/topics" component={Topics}></Route> 
            </div>

        </Router>
        
    )
}

ReactDOM.render(<BasicExample />, document.getElementById('root'));

