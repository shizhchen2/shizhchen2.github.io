import React,{Component} from 'react';
import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Radio,
    Button,
} from "antd-mobile";
import {connect} from 'react-redux';
import '../../commons/index.css';
import {register} from '../../redux/action.js';
import {Redirect} from 'react-router-dom';
import Logo from '../../components/logo/logo';
import {reqRegister} from "../../api";

const ListItem = List.Item;




class Register extends Component{

    state = {
            userName:"",
            password:"",
            passwordAgain:"",
            userType:"Applier",
            gender:"Male",
    }



    handleRegister = () => {
        this.props.register(this.state)
    }

    handleChange= (prop,val) => {
        this.setState({
            [prop]:val
        })
    }

    toLogin = ()=>{
        this.props.history.replace('/login')
    }

    render(){
        const {msg,redirectTo} = this.props.user
        if(redirectTo){
            return <Redirect to={redirectTo} />
        }

        return (
            <div>
                <NavBar>Talk&nbsp;to&nbsp;Boss!</NavBar>
                <Logo />
                <WingBlank>
                    <List>
                        {msg?<div className='error-msg'>{msg}</div>:null}
                        <InputItem onChange={val=>{this.handleChange('userName',val)}} placeholder='Please enter your user name'>
                            User Name:
                        </InputItem>
                        <WhiteSpace/>
                        <InputItem type="password" onChange={val=>{this.handleChange('password',val)}} placeholder='Please set your password'>
                            &nbsp;&nbsp;&nbsp;Password:
                        </InputItem>
                        <WhiteSpace/>
                        <InputItem type="password" onChange={val=>{this.handleChange('passwordAgain',val)}} placeholder='Please enter your password again'>&nbsp;&nbsp;Confir Psd:
                        </InputItem>
                        <WhiteSpace/>
                        <ListItem>
                            <span>&nbsp;User Types:</span>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <Radio onChange={()=>{this.handleChange('userType',"Applier")}} checked={this.state.userType==='Applier'}>Applier</Radio>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Radio onChange={()=>{this.handleChange('userType',"Boss")}} checked={this.state.userType==='Boss'}>Boss</Radio>
                        </ListItem>
                        <ListItem>
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Gender:</span>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <Radio onChange={()=>{this.handleChange('gender',"Male")}} checked={this.state.gender==='Male'}>Male</Radio>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Radio onChange={()=>{this.handleChange('gender',"Female")}} checked={this.state.gender==='Female'}>Female</Radio>
                        </ListItem>
                        <WhiteSpace/>
                        <Button type="primary" onClick={this.handleRegister}>Register</Button>
                        <Button onClick={this.toLogin}>Already Registered?</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}
export default connect(state =>({user:state.user}),
    {register}
    )(Register)