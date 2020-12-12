import {combineReducers} from "redux";
import {getRedirectTo} from "../utils";
import {AUTH_SUCCESS,ERROR_MSG,RECEIVE_USER,RESET_USER,RECEIVE_USERLIST,RECEIVE_MSGLIST,RECEIVE_MSG,MSG_READ} from "./actionTypes";

const initUser = {
    userName:'',
    userType:'',//用户类型
    msg:'',//错误信息
    redirectTo:''
}


function user(state=initUser,action){
    switch (action.type) {
        case AUTH_SUCCESS://data = user
            const {userType,avatar} = action.data
            return {...action.data,redirectTo:getRedirectTo(userType,avatar)}
        case ERROR_MSG://data = msg
            return {...state,msg:action.data}
        case RECEIVE_USER://data=user
            return action.data
        case RESET_USER://data = msg
            return {...initUser,msg:action.data}
            default:
                return state
    }

}

const initUserList = []

function userList(state=initUserList,action){
    switch(action.type){
        case RECEIVE_USERLIST:
            return action.data
        default:
            return state
    }
}



//聊天的reducer
const initChat = {
    users:{},//所有用户信息的对象，属性名userid,属性值:{userName,avatar}
    chatMsgs:[],
    unReadCount:0
}

function chat(state=initChat,action){
    switch(action.type){
        case RECEIVE_MSGLIST:
            const {users,chatMsgs,userid} = action.data
            return {
                users,
                chatMsgs,
                unReadCount:chatMsgs.reduce((preTotal,msg)=>preTotal+(!msg.read&&msg.to===userid?1:0),0)
            }
        case RECEIVE_MSG:
            const {chatMsg} = action.data
            return {

                users:state.users,
                chatMsgs:[...state.chatMsgs,chatMsg],
                unReadCount:state.unReadCount + (!chatMsg.read&&chatMsg.to===action.data.userid?1:0)
            }
        case MSG_READ:
            const {from,to,count} = action.data
            state.chatMsgs.forEach(msg=>{
                if(msg.from===from&&msg.to===to&&!msg.read){
                    msg.read = true
                }
            })
            return {
                users:state.users,
                chatMsgs:state.chatMsgs.map(msg=>{
                    if(msg.from===from&&msg.to===to&&!msg.read){
                        return {...msg,read:true}
                    }else{
                        return msg
                    }
                }),
                unReadCount:state.unReadCount-count
            }
        default:
            return state
    }
}
export default combineReducers({
    user,
    userList,
    chat
})
