
export function getRedirectTo(userType,avatar){
    let path = ''
    if(userType==='Boss'){
        path = '/boss'
    }else{
        path = '/applier'
    }

    if(!avatar){
        path+='info'
    }





    return path
}


