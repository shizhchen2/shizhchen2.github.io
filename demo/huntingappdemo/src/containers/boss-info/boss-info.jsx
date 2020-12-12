import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import{
    NavBar,
    InputItem,
    TextareaItem,
    Button
} from 'antd-mobile'
import AvatarSelector from '../../components/profile-pic-selector/avatar-selector.jsx'
import {updateUser} from "../../redux/action.js";

class BossInfo extends React.Component{

    state = {
        avatar:'',
        post:'',
        info:'',
        company:'',
        salary:'',
    }

    setAvatar = (avatar)=>{
        this.setState({
            avatar:avatar
        })
    }

    handleChange = (name,value)=>{
        this.setState({
            [name]:value
        })
    }

    save = ()=>{
        this.props.updateUser(this.state)
    }

    render(){

        const {avatar,userType} = this.props.user
        if(avatar){
            const path = userType==='Boss'?'/boss':'/applier'
            return <Redirect to={path}/>
        }

        return (
            <div>
                <NavBar>Please complete your information</NavBar>
                <AvatarSelector setAvatar = {this.setAvatar}/>
                <InputItem placeholder="Please enter the position you want to recruit" onChange={val=>this.handleChange('post',val)}>Position:</InputItem>
                <InputItem placeholder="Please enter your company name" onChange={val=>this.handleChange('company',val)}>Comp name:</InputItem>
                <InputItem placeholder="Please enter the salary" onChange={val=>this.handleChange('salary',val)}>Salary:</InputItem>

                <TextareaItem title="Job desc:" rows={3}
                              onChange={val=>this.handleChange('info',val)}/>
                <Button type='primary' onClick={this.save}>Save</Button>
            </div>
        )
    }
}


export default connect(state=>({user:state.user}),{updateUser})(BossInfo)