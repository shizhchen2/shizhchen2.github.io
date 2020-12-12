import React,{Component} from 'react'
import {connect} from 'react-redux'
import UserList from '../../components/user-list/user-list.jsx'
import {getUserList} from "../../redux/action.js";

class Boss extends Component {

    componentDidMount() {
        this.props.getUserList('Applier')

    }
    render(){
        return (
            <UserList userList={this.props.userList}/>
        )
    }
}


export default connect(state=>({userList:state.userList}),{getUserList})(Boss)