//use mongoose to test mongodb

const md5 = require('blueimp-md5')// md5 加密
//connect to the database
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/huntingapp_test',{useNewUrlParser: true })
const conn = mongoose.connection
conn.on('connected',function(){
    console.log('mgdb contect success')
})

const userSchema = mongoose.Schema({
    userName:{type:String,required:true},
    password:{type:String,required:true},
    userType:{type:String,required:true},
    gender:{type:String,required:true},
    header:{type:String}

})

const UserModel = mongoose.model('user',userSchema)//集合名称:users


//CRUD

function save_test(){
    const userModel = new UserModel({
        userName: "Tim",
        password: md5("345"),
        userType: "Applier",
        gender:"Male"
    })
    userModel.save(function(error,user){
        console.log('save()',error,user)
    })
}

// save_test()

function find_test(){
    UserModel.find(function(error,users){//得到所有匹配的数组，如果没有就是【】
        console.log('find()',error,users)
    })
    UserModel.findOne({_id:"5d5e489b63ff2402d6615e86"},function(error,user){//得到所有匹配的数组，如果没有就是null
        console.log('findOne()',error,user)
    })
}
// find_test()

function update_test(){
    UserModel.findByIdAndUpdate({
        _id: "5d5e489b63ff2402d6615e86"
    },{userName:"Jack"},function (error,doc) {
        console.log('findByIdAndUpdate()',error,doc)
    })

}
// update_test()
function remove_test(){
    UserModel.remove({_id:"5d5e489b63ff2402d6615e86"},function(error,doc){
        console.log(error,doc)
    })//删除记录n为记录数
}
// remove_test()