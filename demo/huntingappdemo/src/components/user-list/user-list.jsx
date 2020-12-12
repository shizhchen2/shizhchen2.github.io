import React from 'react'
import PropTypes from 'prop-types'
import {WingBlank,WhiteSpace,Card} from "antd-mobile";
import {withRouter} from 'react-router-dom'
import QueueAnim from 'rc-queue-anim'
const Header = Card.Header
const Body = Card.Body

class UserList extends React.Component{
    static propTypes = {
        userList:PropTypes.func.isRequired
    }

    render(){
        const {userList} = this.props
        return (

            <WingBlank style={{marginBottom:50,marginTop:50}}>
                <QueueAnim type='scale' delay={100}>
                {
                    userList.map((user)=>(
                        <div key={user._id}>
                            <WhiteSpace/>
                            <Card onClick={()=>this.props.history.push(`/chat/${user._id}`)}>
                                <Header
                                    thumb={require(`../../commons/avatars/${user.avatar}.jpg`)}
                                    extra={user.userName}
                                />
                                <Body>
                                    <div>Post:{user.post}</div>
                                    {user.company?<div>Company:{user.company}</div>:null}
                                    {user.salary?<div>Salary:{user.salary}</div>:null}

                                    <div>description:{user.info}</div>

                                </Body>





                            </Card>


                        </div>
                    ))

                }
                </QueueAnim>
            </WingBlank>

        )
    }
}

export default withRouter(UserList)