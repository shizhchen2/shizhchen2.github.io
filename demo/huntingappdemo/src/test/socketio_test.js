

import io from 'socket.io-client'
//连接对象
const socket = io('ws://localhost:4000')

socket.emit('sendMsg',{name:'abc'})
// console.log('client send msg to host',{name:'abc'})
socket.on('receiveMsg',function(data){
    // console.log(data)
})

// socket.on('receiveMsg',function(data){
//     console.log('浏览器端接收到消息',data)
// })
//
// socket.emit('sendMsg',{name:'Tom',date: Date.now()})
//
// console.log('浏览器向服务器发送信息：',{name:'Tom',date: Date.now()})