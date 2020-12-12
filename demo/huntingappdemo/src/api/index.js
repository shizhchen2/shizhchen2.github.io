//包含n个接口请求的函数模块
import ajax from './ajax'

export const reqRegister = (user)=> ajax('/register',user,'POST')


export const reqLogin = ({userName,password}) => ajax('./login',{userName,password},'POST')

export const reqUpdateUser = user=>ajax('/update',user,'POST')

export const reqUser = ()=> ajax('/user')

export const reqUserList = (userType)=> ajax('/userList',{userType})


export const reqChatMsgList = ()=>ajax('/msglist')

export const reqReadMsg = (from)=>ajax('/readmsg',{from},'POST')