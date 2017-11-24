// point class
function pointClass(canvas,x,y){
  this.connected = false;
  this.connectedPerc = false;
  this.attachedLine;
 
  this.x = x;
  this.y = y;

  this.display = function(){
    if (this.connectedPerc == true){
        canvas.stroke(0,255,0);
        canvas.strokeWeight(2);
        canvas.fill(0,255,0);
        canvas.rect(this.x-25,this.y-25, 50,50, 20);
    }
    canvas.stroke(0);
    canvas.strokeWeight(20);
    canvas.point(x,y);
  }
  this.disconnect = function(){
    this.connectedPerc = false;
  	this.connected = false;
  	this.attachedLine = undefined; 
  }
}

