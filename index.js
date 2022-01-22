const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
});

server.listen(process.env.PORT || 8080, () => {
  var port = process.env.PORT || 8080
  console.log('listening on *:${port}');
});