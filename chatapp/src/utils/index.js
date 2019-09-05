//判断怎么切路由
export function getRedirectTo(type,avatar){
    let path = ''
    if(type==='employer'){
        path='/employer'
    }else{
        path='/employee'
    }
    if(!avatar){
        path+='Info'
    }
    return path
}

