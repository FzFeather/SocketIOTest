class Tile{
  constructor(id) {
    this.id = id;
  }
  
  get_name(){
    let num = (this.id % 36) / 4 + 1;
    let type = "x";

    if(this.id <= 35)
      type = "m"
    else if(this.id <= 71)
      type = "p"
    else if(this.id <= 107)
      type = "s"
    else
      type = "z"

    if(type != "z" && num == 5 && this.id % 4 == 0)
      num = 0;

    return num + type;
  }
}