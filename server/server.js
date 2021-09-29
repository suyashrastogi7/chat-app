const express = require('express');
const cors = require('cors');
// const { createServer } = require("http");
const socketio = require("socket.io");
require('dotenv').config();
const PORT  = 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cors());

app.use(express.static(__dirname + '/public'))


const server = app.listen(5000);

const io = socketio(server)

io.on('connection', (socket) => {
    socket.on('messageFromClient', (payload) => {
      socket.broadcast.emit('messageFromServer',payload)
    })
})