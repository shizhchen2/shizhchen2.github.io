import {reqRegister,reqLogin,reqUpdate,reqUser,reqUserList,reqChatList,reqReadMsg} from '../api'
import {AUTH_SUCCESSFUL,ERROR_MSG,UPDATE_USER,RESET_USER,GET_USERLIST,GET_CHATLIST,GET_MSG,READ_MSG} from './actionTypes'

//异步的action
import io from 'socket.io-client'

function initIO(dispatch,userid){
    if(!io.socket){
        io.socket = io('ws://localhost:8080')
        io.socket.on('receiveMsg',function(chatMsg){
            console.log(chatMsg)
            if(userid===chatMsg.from || userid===chatMsg.to){
                dispatch(get_msg(chatMsg,userid))
            }
        })
    }
     
}

const auth_successful = (user)=>({type:AUTH_SUCCESSFUL,data:user})

const error_msg = (msg)=>({type:ERROR_MSG,data:msg})

const update_user = (user) =>({
    type:UPDATE_USER,data:user
})
export const reset_user = (msg) =>({
    type:RESET_USER,data:msg
})

const get_user_list = (userList)=>({
    type:GET_USERLIST,data:userList
})
const get_chat_list = ({users,chatMsgs,userid})=>({
    type:GET_CHATLIST,data:{users,chatMsgs,userid}
})
const get_msg = (chatMsg,userid)=>({
    type:GET_MSG,data:{chatMsg,userid}
})

const read_msg = ({from,to,count}) =>({
    type:READ_MSG,data:{from,to,count}
})
export const register = (user)=>{
    const {username,password,password_again,type}=user 
    if(!username){
        return error_msg('用户名请指定')
    }else if(password!==password_again){
        return error_msg('两次密码要一致！')
    }

    return async dispatch =>{

        const response = await reqRegister({username,password,type})
        const result = response.data
        if(result.code===0){
            getMsgList(dispatch,result.data._id)
            dispatch(auth_successful(result.data))
        }else{
            dispatch(error_msg(result.msg))
        }
    }
}

export const login = (user)=>{
    const {username,password}=user 
    if(!username){
        return error_msg('用户名请指定')
    }else if(!password){
        return error_msg('请输入密码')
    }

    return async dispatch =>{
        const response = await reqLogin(user)
        const result = response.data
        if(result.code===0){
            getMsgList(dispatch,result.data._id)
            dispatch(auth_successful(result.data))
        }else{
            dispatch(error_msg(result.msg))
        }
    }
}

export const update = (user)=>{
    return async dispatch =>{
        const response = await reqUpdate(user)
        const result = response.data
        if(result.code===0){
            dispatch(update_user(result.data))
        }else{
            dispatch(reset_user(result.msg))
        }
    } 
}

export const getUser =()=>{
    return async dispatch =>{
        const response = await reqUser()
        const result = response.data
        if(result.code ===0){
            getMsgList(dispatch,result.data._id)
            dispatch(update_user(result.data))
        }else{
            dispatch(reset_user(result.msg))
        }
    }
}

export const getUserList = (type)=>{
    return async dispatch =>{
        const response = await reqUserList(type)
        const result = response.data
        if(result.code===0){
            dispatch(get_user_list(result.data))
        }
    }
}
async function getMsgList(dispatch,userid){
    initIO(dispatch,userid)
    const response = await reqChatList()
    const result = response.data
    if(result.code===0){
        const {users,chatMsgs} = result.data
        dispatch(get_chat_list({users,chatMsgs,userid}))
    }
}



export const sendMsg = ({from,to,content}) =>{
    return dispatch =>{
        io.socket.emit('sendMsg',{from,to,content})
    }
}

export const readMsg =(from,to) =>{
    return async dispatch =>{
        const response = await reqReadMsg(from)
        const result = response.data
        if(result.code===0){
            const count = result.data
            dispatch(read_msg({from,to,count}))
        }
        
    }
} 