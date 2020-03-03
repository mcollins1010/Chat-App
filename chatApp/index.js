const express = require('express');
const socket = require('socket.io');  //server side or backend socket

//App setup
const app = express();
const server = app.listen(4000,()=>{
  console.log("listening to port 4000..")
});

//static files i.e css,html
app.use(express.static('public'));

//socket setup
var io = socket(server)   //socket will be sitting now waiting for connection

//listen for connection
io.on('connection',(socket)=>{    //fxn is called immediately der is a connectn
  //when a client connects,u get the connectn mth,
  //d fxn runs passing the socket obj
  console.log("made socket connection",socket.id);

  //recieves the emited 'chat' msg from chat.js(frm 1 client)
  socket.on('chat',data => {
    //send it to all the connected sockets/clients including sender
    io.sockets.emit('chat', data)
  });

  //recieving the typing msg from index.js
  socket.on('typing',data =>{
    //broadcasting msg to all client but for sender
    socket.broadcast.emit('typing',data)
  });


});
