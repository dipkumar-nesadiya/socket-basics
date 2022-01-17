const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname+'/public'));
app.use(express.static(__dirname+'/js'));

io.on('connection', (socket) => {
    console.log('User connected via socket.io');

    socket.on('message', (message) => {
        console.log(`Message received : ${message.text}`);

       // io.emit(); //Send message including sender
        socket.broadcast.emit('message',message); //Send message excluding sender
    });

    socket.emit('message',{
        text : 'Welcome to socket.io course'
    });
});

http.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});