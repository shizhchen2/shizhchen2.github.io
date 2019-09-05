import React from 'react'
import {connect} from 'react-redux' 
import {getUserList} from '../../redux/actions'
import UserList from '../../components/user-list'
class Employee extends React.Component{

    componentDidMount(){
        this.props.getUserList('employer')
    }

    render(){
        return (
            <UserList userList={this.props.userList} />
        )
    }
}

export default connect(state=>({userList:state.userList}),{getUserList})(Employee)