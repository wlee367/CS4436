// point class
function pointClass(canvas,x,y){
  this.connections_array = [];
  this.color_array = [];

  this.return_coordinates = function(){
    this.x = x;
    this.y = y;
  }
  this.display = function(){
    canvas.point(x,y);
  }
}

