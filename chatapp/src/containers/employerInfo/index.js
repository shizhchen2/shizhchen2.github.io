import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavBar, InputItem, Button, TextareaItem } from 'antd-mobile'
import AvatarSelector from '../../components/avatar-selector'
import {update} from '../../redux/actions'
import {Redirect} from 'react-router-dom'
class EmployerInfo extends Component {

    state = {
        avatar: '',
        post: '',
        info: '',
        company: '',
        salary: '',
    }
    setAvatar = (avatar)=>{
        this.setState({
            avatar
        })
    }

    handleOnChange = (prop, val) => {
        this.setState({
            [prop]: val
        })
    }
    handleSave =()=>{
        this.props.update(this.state)
    }

    render() {
        const {avatar,type} = this.props.user
        if(avatar){
            const path = type==='employer'?'employer':'employee'
            return <Redirect to={path}/>
        }
        return (
            <div>
                <NavBar>雇主信息</NavBar>
                <AvatarSelector setAvatar={this.setAvatar}/>
                <InputItem
                    onChange={(val) => { this.handleOnChange('post', val) }}
                    placeholder='请输入职位'>招聘职位:</InputItem>
                <InputItem
                    onChange={(val) => { this.handleOnChange('company', val) }}
                    placeholder='请输入公司名称'>公司名称:</InputItem>
                <InputItem
                    onChange={(val) => { this.handleOnChange('salary', val) }}
                    placeholder='请输入薪资'>职位薪资:</InputItem>
                <TextareaItem
                    onChange={(val) => { this.handleOnChange('info', val) }}
                    title="职位要求"
                    rows={3}
                />
                <Button 
                onClick={this.handleSave}
                type="primary">保存</Button>
            </div>
        )
    }
}

export default connect(state => ({user:state.user}), {update})(EmployerInfo)