import React, { Component } from 'react'
import { connect } from 'react-redux'
import {update} from '../../redux/actions'
import { NavBar, InputItem, Button, TextareaItem } from 'antd-mobile'
import AvatarSelector from '../../components/avatar-selector'
import {Redirect} from 'react-router-dom'
class EmployeeInfo extends Component {
    state = {
        avatar: '',
        post: '',
        info: '',
    }
    setAvatar = (avatar) => {
        this.setState({
            avatar
        })
    }

    handleOnChange = (prop, val) => {
        this.setState({
            [prop]: val
        })
    }
    handleSave = () => {
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
                <NavBar>求职信息</NavBar>
                <AvatarSelector setAvatar={this.setAvatar} />
                <InputItem
                    onChange={(val) => { this.handleOnChange('post', val) }}
                    placeholder='请输入期望职位'>应聘聘职位:</InputItem>
                <TextareaItem
                    onChange={(val) => { this.handleOnChange('info', val) }}
                    title="个人描述"
                    rows={3}
                />
                <Button
                    onClick={this.handleSave}
                    type="primary">保存</Button>
            </div>
        )
    }
}

export default connect(state => ({user:state.user}), {update})(EmployeeInfo)