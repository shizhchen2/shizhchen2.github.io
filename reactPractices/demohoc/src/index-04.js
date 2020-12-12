import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router,Route,Link,withRouter,Prompt} from 'react-router-dom'



const App = () =>{
    return (
        <Router>
            <ul>
                <li>
                    <Link to="/">Form</Link>
                </li>
                <li>
                    <Link to="/one">One</Link>
                </li>
                <li>
                    <Link to="/two">Two</Link>
                </li>
        
            </ul>


            <Route exact path="/" component={Form} />
            <Route path="/one" 
            render={()=>(
                <h1>One</h1>
            )}
             />
            <Route path="/two" 
            render={()=><h1>Two</h1>}
            />
        </Router>
    )
}
class Form extends React.Component{
    state={
        isBlock:false,
    }
    render(){
        const {isBlock}  = this.state;
        return <form onSubmit={(e)=>{e.preventDefault()
        alert("后续操作")}}>
            <Prompt 
                when={isBlock}
                message="确定放弃此表单嘛"
            >
                </Prompt>
            <label>是否阻止跳转?
            <p>
                {isBlock?"Yes,阻止模式":"No，非阻止模式"}
            </p>

            <input 
            size="50"
            placeholder="请输入一些内容"
            onChange={(e)=>{this.setState({
                isBlock:e.target.value.length>0
            })}} />
            <input type="submit" />
            </label>
           
        </form>
    }
}




ReactDOM.render(<App/>,document.getElementById('root'))