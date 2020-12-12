import React from 'react'
import {Route,Link} from 'react-router-dom'
import MsgDetail from './msgdetails'
export default class Message extends React.Component {

    state = {
        messages:[

        ]
    }

    componentDidMount() {
        setTimeout(()=>{
            const messages = [
                {id:1,title:'message1'},
                {id:2,title:'message2'},
                {id:3,title:'message3'},
            ]
            this.setState({messages})
        },1000)
    }

    render() {

        return(
            <div>
                <ul>
                {
                    this.state.messages.map((msg,index)=>(
                        <li key={index}>
                            <Link to={`/home/message/detail/${msg.id}`}>{msg.title}</Link>
                        </li>))
                }
                </ul>
                <Route path='/home/message/detail/:id' component={MsgDetail}/>
            </div>

        )
    }
}