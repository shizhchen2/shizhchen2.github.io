import React from 'react'
import {Result, List, WhiteSpace, Button,Modal} from 'antd-mobile'
import {connect} from 'react-redux'
import Cookies from 'js-cookie'
import {resetUser} from "../../redux/action.js";

const Item = List.Item
const Brief = Item.Brief
class Personal extends React.Component {

    logout = ()=>{
        Modal.alert('Exit','Are you sure to log out?',[{text:'cancel'},{text:'OK',onPress:()=>{
            Cookies.remove('userid')

            this.props.resetUser()


        }}])
    }
    render(){
        const {userName,info,avatar,company,post,salary} = this.props.user
        // console.log(this.props)

        return (

            <div style={{marginBottom:50,marginTop:50}}>
                <Result
                img={<img src={require(`../../commons/avatars/${avatar}.jpg`)} style={{width:50}} alt='avatar'/>}
                title={userName}
                message={company}
                />
                <List renderHeader={()=>'Related Info'}>
                    <Item multipleLine>
                        <Brief>Post:{post}</Brief>
                        <Brief>Brief:{info}</Brief>
                        {salary?<Brief>Salary:{salary}</Brief>:null}

                    </Item>
                </List>
                <WhiteSpace/>
                <List>
                    <Button type='warning' onClick={this.logout}>Log Out</Button>
                </List>
            </div>

        )



    }

}

export default connect(state=>({user:state.user}),{resetUser})(Personal)