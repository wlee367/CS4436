// point class
function pointClass(x,y){
  this.connections_array = [];
  this.color_array = [];

  this.return_coordinates = function(){
    this.x = x;
    this.y = y;
  }
  this.display = function(){
    point(x,y);
  }
}

