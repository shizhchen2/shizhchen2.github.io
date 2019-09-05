import React from 'react'
import {connect} from 'react-redux' 
import {List, Badge} from 'antd-mobile'

function getLastMsgs(chatMsgs,userid){
    const lastChats = {}
    chatMsgs.forEach(element => {
        //对每条chatMsg进行未读统计
        if(element.to===userid&&!element.read){
            element.unReadCount = 1
        }else{
            element.unReadCount = 0

        }
       
        const lastMsg = lastChats[element.chat_id]
        if(!lastMsg){
            lastChats[element.chat_id] = element
        }else{
            const unReadCount = lastMsg.unReadCount + element.unReadCount
            if(element.create_time>lastMsg.create_time){
                lastChats[element.chat_id] = element
            }
            lastChats[element.chat_id].unReadCount = unReadCount
        }
    });
    const lastMsgs = Object.values(lastChats)
    lastMsgs.sort(function(m1,m2){
        return m2.create_time-m1.create_time
    })
    return lastMsgs
}

class Messages extends React.Component{

    render(){
        const {user } = this.props
        const {users,chatMsgs } = this.props.chat

        //根据chat_id来分组消息
        const lastMsgs = getLastMsgs(chatMsgs,user._id)
        console.log(lastMsgs)
        return (
            <List style={{marginTop:50,marginBottom:50}}>
                {
                    lastMsgs.map((el)=>{
                        const targetUser = el.from===user._id?users[el.to]:users[el.from]
                        const targetUserId = el.from===user._id?el.to:el.from
                        return (

                            <List.Item
                            key={el._id}
                            extra={<Badge text={el.unReadCount}/>}
                            thumb={targetUser.avatar?require(`../../assets/images/${targetUser.avatar}.png`):null}
                            arrow='horizontal'
                            onClick={()=>this.props.history.push(`/chat/${targetUserId}`)}
                        >
                            {el.content}
                            <List.Item.Brief>{targetUser.username}</List.Item.Brief>
                        </List.Item>
                        )
                        
                    
                    })
                }
            </List>
        )
    }
}

export default connect(state=>({user:state.user,chat:state.chat}),{})(Messages)