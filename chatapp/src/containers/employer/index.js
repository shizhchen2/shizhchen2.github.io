import React from 'react'
import {connect} from 'react-redux' 
import UserList from '../../components/user-list'
import {getUserList} from '../../redux/actions'
class Employer extends React.Component{

    componentDidMount(){
        this.props.getUserList('employee')
    }

    render(){
        let {userList} = this.props
        return (
            <UserList userList={userList} />
        )
    }
}

export default connect(state=>({userList:state.userList}),{getUserList})(Employer)