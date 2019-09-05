import {combineReducers} from 'redux'
import {AUTH_SUCCESSFUL,ERROR_MSG,UPDATE_USER,RESET_USER,GET_USERLIST,GET_CHATLIST,GET_MSG,READ_MSG} from './actionTypes'
import {getRedirectTo} from '../utils'
 
const initUser = {
    username:'',
    type:'',
    msg:'',
    redirectTo:''
}

function user(state=initUser,action){
    switch(action.type){
        case AUTH_SUCCESSFUL:
            const {type,avatar} = action.data
            return {...action.data,redirectTo:getRedirectTo(type,avatar)}
        case ERROR_MSG:
            return {...state,msg:action.data} 
        case UPDATE_USER:
            return action.data
        case RESET_USER:
            return {...initUser,msg:action.data}         
        default:
            return state
    }
}

const initUserList = []
function userList(state=initUserList,action){
    switch(action.type){
        case GET_USERLIST:
            return action.data
        default:
            return state
    }
}

const intiChat = {users:{},chatMsgs:[],unReadCount:0}
function chat(state=intiChat,action){
    switch(action.type){
        case GET_CHATLIST:
            const {users,chatMsgs,userid} = action.data
            return {
                users,
                chatMsgs,
                unReadCount:chatMsgs.reduce((result,chatMsg)=>
                    result+(!chatMsg.read&&chatMsg.to===userid?1:0)
                ,0)
            }
        case GET_MSG:
            const {chatMsg} = action.data
            return {
                users:state.users,
                chatMsgs:[...state.chatMsgs,chatMsg],
                unReadCount:state.unReadCount+(!chatMsg.read&&chatMsg.to===action.data.userid?1:0)
            }
        case READ_MSG:
            const {from,to,count} = action.data
            return {
                users:state.users,
                chatMsgs:state.chatMsgs.map(
                    (msg)=>{
                        if(msg.from===from&&msg.to===to&&!msg.read){
                            return {...msg,read:true}
                        }else{
                            return msg
                        }
                    }
                ),
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