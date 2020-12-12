var express = require('express');
var router = express.Router();

const md5 = require('blueimp-md5');
const {UserModel,ChatModel} = require('../db/models')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const filter = {password:0,__v:0}//属性过滤器



//注册路由
router.post('/register',function(req,res){
    //读取请求参数
    const {userName,password,userType,gender} = req.body

    //处理
    UserModel.findOne({userName},function(error,user){
        if(user){
            res.send({code:1,msg:'Account already exist!'})
        }
        else{
            new UserModel({userName,password:md5(password),userType,gender}).save((error,user)=>{
                const showUser = {userName,userType,gender,_id:user._id}
             res.cookie('userid',user._id,{maxAge:1000*60*60})

                res.send({code:0,data:showUser})
            })
        }
    })



    //登录的路由
})
router.post('/update',function(req,res){
    //从请求的cookie
    const userid =req.cookies.userid
    if(!userid){
        res.send({code:1,msg:'please sign in!'})
        return
    }
    const user = req.body
    UserModel.findByIdAndUpdate({_id:userid},user,function(error,oldUser){
        if(!oldUser){
            res.clearCookie('userid')
            res.send({code:1,msg:'please sign in!'})
        }else{
            const {_id,userName,userType} = oldUser
            const data = Object.assign({_id,userName,userType},user)
            res.send({code:0,data:data})
        }
    })
})








//登录路由
router.post('/login',function(req,res){
    const {userName,password} = req.body

    //
    UserModel.findOne({userName,password:md5(password)},filter,function(error,user){
        if(user){
            res.cookie('userid',user._id,{maxAge:1000*60*60})
            res.send({code:0,data:user})
        }else{
            res.send({code:1,msg:"something wrong in username or password"})
        }
    })

})



router.get('/user',function(req,res){

    const userid = req.cookies.userid
    if(!userid){
        return res.send({code:1,msg:'Please sign in'})
    }
    UserModel.findOne({_id:userid},filter,function(err,user){
        res.send({code:0,data:user})
    })
})

router.get('/userList',function(req,res){
    const {userType} = req.query
    UserModel.find({userType},filter,function(err,users){
        res.send({code:0,data:users})
    })
})



router.get('/msglist',function(req,res){
    const userid = req.cookies.userid
    UserModel.find(function(err,userDocs){
        // const users = {}
        // userDocs.forEach(doc=>{
        //     users[doc._id] = {userName:doc.userName,avatar:doc.avatar}
        // })
        const users = {}
        userDocs.forEach(doc => {
            users[doc._id] = {username: doc.userName, avatar: doc.avatar} })
        // userDocs.reduce((users,user)=>{
        //     users[user._id] = {username:user.userName,avatar: user.avatar}
        //     return users
        // },{})
        ChatModel.find({'$or':[{from:userid},{to:userid}]},filter,function(err,chatMsgs){
            res.send({code:0,data:{users,chatMsgs}})
        })
    })

})


router.post('/readmsg',function(req,res){
    const from = req.body.from
    const to = req.cookies.userid

    ChatModel.update({from,to,read:false},{read:true},{multi:true},function(err,doc){
        res.send({code:0,data:doc.nModified})
    })
})





























module.exports = router;
