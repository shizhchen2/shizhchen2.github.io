import React,{Component} from 'react'
import Logo from '../../components/logo'
import {NavBar,WingBlank,WhiteSpace,InputItem,List, Button} from 'antd-mobile'
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom'
import {login} from '../../redux/actions'
class Login extends Component{
    state = {
        username:'',
        password:''
    }

    handleOnChange = (prop,val)=>{
        this.setState({
            [prop]:val
        })
    }
    handleSignIn = ()=>{
        this.props.login(this.state)
    }

    toRegister = () =>{
        this.props.history.replace('/register')
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
                    <InputItem onChange={(val)=>this.handleOnChange('username',val)}>&nbsp;&nbsp;&nbsp;&nbsp;用户名:</InputItem>
                    <WhiteSpace/>
                    <InputItem type="password" onChange={(val)=>this.handleOnChange('password',val)}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;密码:</InputItem>
                </List>
                <WhiteSpace/>
                <Button type="primary" onClick={this.handleSignIn}>登录</Button>
                <Button onClick={this.toRegister}>没有账号？</Button>
                </WingBlank>
            </div>
        )
    }
}

export default connect(state=>({user:state.user}),{login})(Login)