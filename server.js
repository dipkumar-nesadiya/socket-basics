const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const moment = require('moment');

app.use(express.static(__dirname + '/public'));

let clientInfo = {};

function sendCurrentUsersInfo(socket) {
    let info = clientInfo[socket.id];
    let users = [];

    if (typeof info === 'undefined') {
        return;
    }

    Object.keys(clientInfo).forEach((socketID) => {
        let userInfo = clientInfo[socketID];

        if (userInfo.room === info.room) {
            users.push(userInfo.name);
        }
    });

    socket.emit('message', {
        name: 'System',
        text: 'Current Users: ' + users.join(', '),
        timestamp: moment().valueOf()
    });
}

io.on('connection', (socket) => {
    console.log('User connected via socket.io');

    socket.on('disconnect', function () {
        let userData = clientInfo[socket.id];

        if (typeof userData !== 'undefined') {
            socket.leave(userData.room);
            io.to(userData.room).emit('message', {
                name: 'System',
                text: `<b style="color:red"> ${userData.name} has left! </b>`,
                timestamp: moment().valueOf()
            });
            delete clientInfo[socket.id];
        }
    });

    socket.on('joinRoom', (req) => {
        clientInfo[socket.id] = req;
        socket.join(req.room);
        socket.broadcast.to(req.room).emit('message', {
            name: 'System',
            text: `<b style="color:green"> ${req.name} has joined! </b>`,
            timestamp: moment().valueOf()
        });
    });

    socket.on('message', (message) => {
        console.log(`Message received : ${message.text}`);

        if (message.text === '@currentUser') {
            sendCurrentUsersInfo(socket);
        } else {
            message.timestamp = moment().valueOf();

            io.to(clientInfo[socket.id].room).emit('message', message); //Send message including sender
            // socket.broadcast.emit('message',message); //Send message excluding sender
        }
    });

    socket.emit('message', {
        text: 'Welcome to the chat application',
        name: 'System',
        timestamp: moment().valueOf()
    });
});

http.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});