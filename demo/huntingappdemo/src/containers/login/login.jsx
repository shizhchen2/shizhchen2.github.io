import React,{Component} from 'react'
import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Button,
} from "antd-mobile";
import Logo from '../../components/logo/logo'

import {connect} from 'react-redux'
import {login} from '../../redux/action.js'
import {Redirect} from 'react-router-dom'




const ListItem = List.Item;


class Login extends Component{
    state = {
        userName:"",
        password:""
    }

    toRegister =()=>{
        this.props.history.replace('./register');
    }

    handleChange = (prop,val)=>{
        this.setState({
            [prop]:val
        })
    }
    handleSignIn = ()=>{
        this.props.login(this.state)
    }

    render(){
        const {msg,redirectTo} = this.props.user
        if(redirectTo){
            return <Redirect to={redirectTo} />
        }

        return (
            <div>
                <NavBar>Talk&nbsp;to&nbsp;Bosses!</NavBar>
                <Logo />
                <WingBlank>
                    <List>
                        {msg?<div className='error-msg'>{msg}</div>:null}
                        <InputItem onChange={val=>this.handleChange('userName',val)}>
                            User Name:
                        </InputItem>
                        <WhiteSpace/>
                        <InputItem type="password" onChange={val=>this.handleChange('password',val)}>
                            &nbsp;&nbsp;&nbsp;Password:
                        </InputItem>
                        <WhiteSpace/>
                        <Button type="primary" onClick={this.handleSignIn}>Sign In</Button>
                        <Button onClick={this.toRegister}>Without Account?</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}


export default connect(state=>({user:state.user}),{login})(Login)