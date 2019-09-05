import React from 'react'
import {connect} from 'react-redux' 
import {Result,List,WhiteSpace,Button,Modal} from 'antd-mobile'
import Cookies from 'js-cookie'
import {reset_user} from '../../redux/actions'
class Personal extends React.Component{

    logout = ()=>{
        Modal.alert('退出','确认退出登陆吗？',[
            {
                text:'取消',
            },
            {
                text:'确定',
                onPress:()=>{
                    Cookies.remove('userid')
                    this.props.reset_user()
                }
            }
        ])
    }
    render(){
        const {username,info,avatar,company,post,salary} = this.props.user
        return (
            <div style={{marginTop:50}}>
                <Result
                    img={
                        <img src={require(`../../assets/images/${avatar}.png`)}
                        style={{width:50}}
                        alt='avatar'
                        />
                    }
                    title={username}
                    message={company}
                
                />
                    
                <List renderHeader={()=>'相关信息'}>
                    <List.Item>
                        <List.Item.Brief>职位:{post}</List.Item.Brief>
                        <List.Item.Brief>简介:{info}</List.Item.Brief>
                        {salary?<List.Item.Brief>薪资:{salary}</List.Item.Brief>:null}
                    </List.Item>
                </List>
                <WhiteSpace/>   
                <Button onClick={this.logout}>退出登录</Button>          
            </div>
        )
    }
}

export default connect(state=>({user:state.user}),{reset_user})(Personal)