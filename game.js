class Game{
  constructor(room){
    this.room = room;
    room.game = this;
  }

  start(){
    this.kyoku = new Kyoku(this.room, 0,0);
    this.kyoku.start();
  }
}

class Kyoku{
  constructor(room, rn, kn){
    this.room = room
    this.rn = rn
    this.kn = kn
  }
  start(){
    this.yama = [...Array(116).keys()];
    this.yama.sort(() => (Math.random() > .5) ? 1 : -1);
    this.doraIndicator = this.yama[-1];
    var i = 0;
    for(var p of this.room.players){
      p.tiles = this.yama.slice(28*i, 28*(i+1));
      p.socket.emit('INIT', {'hand': p.tiles, 'doraIndicator':this.doraIndicator});
    }
  }
}

module.exports = Game