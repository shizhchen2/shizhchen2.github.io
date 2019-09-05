import io from 'socket.io-client'

//与服务器的连接对象
const socket = io('ws://localhost:8080')

socket.emit('sendMsg',{name:'abc'})
socket.on('receiveMsg',function(data){
    console.log(data)
})