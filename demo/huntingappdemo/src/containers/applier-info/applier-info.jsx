import React from 'react'
import {connect} from 'react-redux'

import {
    NavBar,
    InputItem,

    Button, TextareaItem
} from 'antd-mobile'
import AvatarSelector from '../../components/profile-pic-selector/avatar-selector.jsx'
import {Redirect} from 'react-router-dom'
import {updateUser} from "../../redux/action.js";

class ApplierInfo extends React.Component{
    state = {
        avatar:'',
        post:'',
        info:'',
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
                <AvatarSelector setAvatar={this.setAvatar}/>
                <InputItem placeholder="Please enter the position you want to apply" onChange={val=>this.handleChange('post',val)}>Position:</InputItem>
                <TextareaItem title="Self Info:" rows={3}
                              onChange={val=>this.handleChange('info',val)}/>

                <Button onClick={this.save} type='primary'>Save</Button>
            </div>
        )
    }
}


export default connect(state=>({user:state.user}),{updateUser})(ApplierInfo)