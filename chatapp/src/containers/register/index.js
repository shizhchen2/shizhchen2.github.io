import React,{Component} from 'react'
import Logo from '../../components/logo'
import {NavBar,WingBlank,WhiteSpace,InputItem,Radio,List, Button} from 'antd-mobile'
import { connect } from 'react-redux'
import {register} from '../../redux/actions'
import {Redirect} from 'react-router-dom'
import '../../../public/index.css'
class Register extends Component{

    state = {
        username:'',
        password:'',
        password_again:'',
        type:'',
    }

    toLogin = ()=>{
        this.props.history.replace('/login')
    }

    handleOnChange = (prop,val)=>{
        this.setState({
            [prop]:val
        })
    }

    handleRegister = ()=>{
        this.props.register(this.state)
    }

    render(){
        const {msg,redirectTo} = this.props.user
        if(redirectTo){
            return <Redirect to={redirectTo}/>
        }
        return (
            <div>
                <NavBar>找老板谈</NavBar>
                <Logo />
                <WingBlank>
                <List style={{marginTop:30}}>
                    {msg?<div className="error-msg">{msg}</div>:null}
                    <InputItem onChange={(val)=>{
                        this.handleOnChange('username',val)
                    }}>&nbsp;&nbsp;&nbsp;&nbsp;用户名:</InputItem>
                    <WhiteSpace/>
                    <InputItem type="password" onChange={(val)=>{
                        this.handleOnChange('password',val)
                    }} >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;密码:</InputItem>
                    <WhiteSpace/>
                    <InputItem type="password" onChange={(val)=>{
                        this.handleOnChange('password_again',val)
                    }}>确认密码:</InputItem>
                    <WhiteSpace/>
                    <List.Item>
                    <span>用户类型:</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Radio checked={this.state.type==='employee'} onChange={()=>{
                        this.handleOnChange('type','employee')
                    }}>求职者</Radio>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Radio checked={this.state.type==='employer'} onChange={()=>{
                        this.handleOnChange('type','employer')
                    }}>老板</Radio>
                    </List.Item>
                </List>
                <WhiteSpace/>
                <Button type="primary" onClick={this.handleRegister}>注册</Button>
                <Button onClick={this.toLogin}>已有账号？</Button>
                </WingBlank>
            </div>
        )
    }
}

export default connect(state=>({user:state.user}),{register})(Register)