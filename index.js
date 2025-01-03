const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const Player = require('./player.js');
const Room = require('./room.js');
const Game = require('./game.js');

const app = express();
const server = createServer(app);
const io = new Server(server);

var rooms = {};

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});
app.use(express.static('static'));

io.on('connection', (socket) => {
  const player = new Player(socket);
  socket.on('JOIN', (msg) => {
    player.setName(msg['name'])
    let roomId = msg['id'];
    let room = rooms[roomId];
    if(!rooms[roomId]){
      room = rooms[roomId] = new Room(roomId);
      room.addPlayer(player);
      socket.emit("JOIN", roomId);
    }else{
      if(rooms[roomId].addPlayer(player)){
        socket.emit("JOIN", roomId);
      }else{
        socket.emit("ERROR", "Room "+ roomId + " is full.");
      }
    }
    console.log(msg['name'] + " joined " + roomId);
    if(room.players.length == 2){
      let roomInfo = [];
      for(var p of room.players){
        roomInfo.push(p.name);
      }
      io.to(room.id).emit('START', roomInfo);
      console.log('START');
      game = new Game(room);
      game.start();
    }
  });
  
  socket.on('READY', (msg) => {
    player.hand = msg;
    // player.river = msg;
  });

  socket.on('DRAW', (msg) => {
  });
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});