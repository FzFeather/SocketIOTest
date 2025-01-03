class Player {
  constructor(socket) {
    this.socket = socket;
  }

  setName(name){
    this.name = name;
  }
  
  join(room){
    if(this.room){
      this.room.removePlayer(this);
    }
    this.room = room;
    this.socket.join(room.id);
  }
}

module.exports = Player;