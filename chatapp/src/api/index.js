import ajax from './ajax'

export const reqRegister = (data)=>ajax('/register',data,'POST')

export const reqLogin = ({username,password})=>ajax('/login',{username,password},'POST')

export const reqUpdate = (user)=>ajax('/update',user,'POST')

export const reqUser = ()=>ajax('/user')

export const reqUserList = (type)=>ajax('/userList',{type})

export const reqChatList = ()=>ajax('/msglist')

export const reqReadMsg = (from)=>ajax('/readmsg',{from},'POST')