import React,{Component} from 'react'
import {connect} from 'react-redux'
import {List,Badge} from 'antd-mobile'

const Item = List.Item
const Brief = Item.Brief

function getLastMsgs(chatMsgs,userid){
//chatMsgs按chat_id进行分组，并得到每个组的lastMsg组成的数组
//1.找出每个聊天的lastMsg，并用一个对象容器来保存{chat_id,lastMsg}

    // 3.对数组进行排序（按create_time降序）
    // *
    // *
    // * */
    const lastMsgObjs = {}
    chatMsgs.forEach(msg => {

        //对msg进行个体的统计
        if(msg.to===userid && !msg.read) {
            msg.unReadCount = 1
        } else{
            msg.unReadCount = 0
        }

        const chatId = msg.chat_id
        let lastMsg = lastMsgObjs[chatId]
        if(!lastMsg){
            lastMsgObjs[chatId] = msg
        }else{
            const unReadCount =lastMsg.unReadCount + msg.unReadCount
            if(msg.create_time>lastMsg.create_time){
                lastMsgObjs[chatId] = msg
            }
            lastMsgObjs[chatId].unReadCount = unReadCount
        }
    })
// 2.得到所有lastMsg的数组
    const lastMsgs = Object.values(lastMsgObjs)
    lastMsgs.sort((a,b)=>(b.create_time-a.create_time))

    // console.log(lastMsgs)
    return lastMsgs

}
class Message extends Component {

//


render(){

    const {user} = this.props
    const {users,chatMsgs} = this.props.chat


    const lastMsgs = getLastMsgs(chatMsgs,user._id)



    return (
        <List style={{marginTop:50,marginBottom:50}}>
            {
                lastMsgs.map(msg=>{
                    const targetUserId = msg.to===user._id?msg.from:msg.to
                    const targetUser = msg.to===user._id? users[msg.from]:users[msg.to]
                    return (
                        <Item
                            onClick={()=>this.props.history.push(`/chat/${targetUserId}`)}
                            key={msg._id}
                            extra={<Badge text={msg.unReadCount}/>}
                            thumb={targetUser.avatar?require(`../../commons/avatars/${targetUser.avatar}.jpg`):null}
                            arrow='horizontal'
                        >{msg.content}
                            <Brief>{targetUser.username}</Brief>
                        </Item>)
                })
            }
        </List>
    )
}
}


export default connect(state=>({user:state.user,chat:state.chat}),{})(Message)