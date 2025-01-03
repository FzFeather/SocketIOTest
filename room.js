class Room {
  constructor(id) {
    this.id = id;
    this.players = [];
  }

  addPlayer(player){
    if(this.players.length < 2){
      this.players.push(player);
      player.join(this);
      return true;
    }else{
      return false;
    }
  }

  removePlayer(player){
    let index = this.players.indexOf(player);
    if(index > -1){
      this.players.splice(index, 1);
      return true;
    }else{
      return false;
    }
  }
}

module.exports = Room;