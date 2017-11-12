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

function drawLine(x1, y1, x2, y2){
  stroke(r, g, b);
  strokeWeight(20);
  line(x1, y1, x2, y2);
}