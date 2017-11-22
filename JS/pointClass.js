// point class
function pointClass(canvas,x,y){
  this.connected = false;
  this.attachedLine;
 
  this.x = x;
  this.y = y;

  this.display = function(){
    canvas.point(x,y);
  }
  this.disconnect = function(){
  	this.connected = false;
  	this.attachedLine = undefined; 
  }
}

