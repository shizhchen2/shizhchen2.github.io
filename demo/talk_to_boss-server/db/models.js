//包含N个数据库集合数据的Model模块

//利用mongoose来链接mongodb
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/huntingapp',{useNewUrlParser: true })
//绑定事件及回调函数
const con = mongoose.connection
con.on('connected',function(){
    console.log('huntingapp connect successful')
})

//创建schema
const userSchema = mongoose.Schema({
    userName:{type:String,required:true},
    password:{type:String,required:true},
    userType:{type:String,required:true},
    gender:{type:String,required:true},
    avatar:{type:String},
    post:{type:String},
    info:{type:String},
    company:{type:String},
    salary:{type:String},

})
//定义模板

const UserModel = mongoose.model('user',userSchema)

//向外暴露模板

exports.UserModel = UserModel


const chatSchema = mongoose.Schema({
    from:{type:String,required:true},
    to:{type:String,required:true},
    chat_id:{type:String,required:true},
    content:{type:String,required:true},
    read:{type:Boolean,default:false},
    create_time:{type:Number}
})

const ChatModel = mongoose.model('chat',chatSchema)

exports.ChatModel = ChatModel