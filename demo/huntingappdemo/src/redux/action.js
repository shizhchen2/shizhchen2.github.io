import {reqRegister,reqLogin,reqUpdateUser,reqUser,reqUserList,reqChatMsgList,reqReadMsg} from '../api'
import {AUTH_SUCCESS,ERROR_MSG,RECEIVE_USER,RESET_USER,RECEIVE_USERLIST,RECEIVE_MSGLIST,RECEIVE_MSG,MSG_READ} from "./actionTypes.js";

//每一个授权的同步action
import io from 'socket.io-client'
// import {RECEIVE_MSG} from "./actionTypes";

const authSuccess = (user)=>({
    type:AUTH_SUCCESS,
    data:user
})

function initIO(dispatch,userid){
    if(!io.socket){
        io.socket = io('ws://localhost:4000')
        io.socket.on('receiveMsg',function(chatMsg){
            console.log('client receives the info from host:',chatMsg)
            if(chatMsg&&(userid === chatMsg.from || userid===chatMsg.to)){
                dispatch(receiveMsg(chatMsg,userid))
            }
        })
    }


}

//异步获取消息方法
async function getMsgList(dispatch,userid){
    initIO(dispatch,userid)
    const response = await reqChatMsgList()
    const result = response.data
    if(result.code===0){
        const {users,chatMsgs} = result.data
        //分发同步action
        dispatch(receiveMsgList({users,chatMsgs,userid}))
    }
}






export const sendMsg = ({from,to,content}) =>{
    return dispatch => {
        console.log('client send info to host',{from,to,content})
        io.socket.emit('sendMsg',{from,to,content})
    }
}






const errorMsg = (msg)=>({type:ERROR_MSG,data:msg})

const receiveUser = (user)=>({type:RECEIVE_USER,data:user})

const msgRead = ({count,from,to})=>({type:MSG_READ,data:{count,from,to}})

export const resetUser = (msg)=>({type:RESET_USER,data:msg})

export const receiveUserList =(userList)=>({type:RECEIVE_USERLIST,data:userList})

export const receiveMsgList = ({users,chatMsgs,userid})=>({type:RECEIVE_MSGLIST,data:{users,chatMsgs,userid}})

export const receiveMsg = (chatMsg,userid)=>({type:RECEIVE_MSG,data:{chatMsg,userid}})

export const register = (user) => {

    const {userName,password,passwordAgain,userType,gender} = user

    if(!userName){
        return errorMsg('Please enter your username')
    }else if(password!==passwordAgain){
        return errorMsg('Password and confirm password does not match')
    }

    //
    return async (dispatch) => {

        const response = await reqRegister({userName,password,userType,gender})
        const result = response.data
        if(result.code===0){
            getMsgList(dispatch,result.data._id)
            dispatch(authSuccess(result.data))
        }else{
            dispatch(errorMsg(result.msg))
        }
    }
}




export const login = (user)=>{
    const {userName,password} = user
    //表单的前台检查
    if(!userName){
        return errorMsg('Please enter your username')
    }

    else if(!password){
        return errorMsg('Please enter your username')
    }


    return async dispatch =>{
        const response = await reqLogin(user)
        const result = response.data
        if(result.code==0){

            getMsgList(dispatch,result.data._id)
            dispatch(authSuccess(result.data))
        }else{
            dispatch(errorMsg(result.msg))
        }
    }
}



export const updateUser = (user) =>{
    return async dispatch =>{
        const response = await reqUpdateUser(user)
        const result = response.data
        if(result.code===0){
            dispatch(receiveUser(result.data))
        }else{
            dispatch(resetUser(result.msg))
        }
    }
}


export const getUser = ()=>{
    return async dispatch =>{
        const response = await reqUser()
        const result = response.data
        if(result.code===0){
            getMsgList(dispatch,result.data._id)
            dispatch(receiveUser(result.data))
        }else{
            dispatch(resetUser(result.msg))
        }
    }
}


export const getUserList  = (userType)=>{
    return async dispatch =>{
       const response = await reqUserList(userType)
       const result = response.data
       if(result.code===0){
           dispatch(receiveUserList(result.data))
       }
    }
}

export const readMsg =(from,to) =>{
    return async dispatch => {
        const response = await reqReadMsg(from)
        const result = response.data
        if(result.code===0){
            const count = result.data
            // console.log(count)
            // const from = targetId
            // const to = user._id
            dispatch(msgRead({count,from,to}))
        }
    }
}