
module.exports = function(server){
    const {ChatModel} = require('../db/models')
    const io = require('socket.io')(server)
    io.on('connection',function(socket){
        console.log('接收到一个客户端')
        socket.on('sendMsg',function({from,to,content}){
            console.log({from,to,content})
            // data.name = data.name.toUpperCase()
            // socket.emit('receiveMsg',{from,to,content})
            // console.log('send msg to client',{from,to,content})
            // //处理数据

            const chat_id = [from,to].sort().join('_')//from_to or to_from
            const create_time = Date.now()


            new ChatModel({from,to,content,chat_id,create_time}).save(function(err,chatMsg){
                io.emit('receiveMsg',chatMsg)
            })
            //向客户端发送消息
        })
    })
}
