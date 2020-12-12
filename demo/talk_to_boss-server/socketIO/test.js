// module.exports = function(server){
//     const io = require('socket.io')(server)
//     io.on('connection',function(socket){
//         console.log('socket connected')
//
//         socket.on('sendMsg',function(data){
//             console.log('服务器接收到浏览器的信息：',data)
//             io.emit('receiveMsg',data.name+"_"+data.date)
//             console.log('服务器向浏览器发信息',data)
//         })
//     })
//
// }


module.exports = function(server){
    const io = require('socket.io')(server)
    io.on('connection',function(socket){
        console.log('接收到一个客户端')
        socket.on('sendMsg',function(data){
            console.log(data)
            data.name = data.name.toUpperCase()
            socket.emit('receiveMsg',data)
            console.log('send msg to client',data)
        })
    })
}
