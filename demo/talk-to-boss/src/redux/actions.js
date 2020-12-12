


//同步action
//异步action
import {reqRegister,reqLogin} from '../api'
import {AUTH_SUCCESS
    ,ERROR_MSG} from "./actionTypes";

//每一个授权的同步action

const authSuccess = (user)=>({
    type:AUTH_SUCCESS,
    data:user
})


const errorMsg = (msg)=>({type:ERROR_MSG,data:msg})


export function register(user){

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
            dispatch(authSuccess(result.data))
        }else{
            dispatch(errorMsg(result.msg))
        }
    }
}







export function login(user){
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
            dispatch(authSuccess(result.data))
        }else{
            dispatch(errorMsg(result.msg))
        }
    }
}