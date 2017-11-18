// line class
//color 1=green, 2 = red, 3 = blue, 0 = black
function lineClass(canvas,p1,p2, c){
	this.p1 = p1;
	this.p2 = p2;
	this.color = c;

 	this.setColor = function(c){
 		this.color = c;
 	}
 	this.display = function(){
 		canvas.line(p1.x, p1.y, p2.x, p2.y);
 	}
  
}

