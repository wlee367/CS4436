// Box
//color 1=green, 2 = red, 3 = blue, 0 = black
function Box(canvas,x,y,w,h){
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;

	//colors
	this.g = false;
	this.r = false;
	this.b = false;

	this.collide = function(line){

		this.hit = canvas.collideLineRect(line.p1.x,line.p1.y,line.p2.x,line.p2.y, 
			this.x,this.y, this.w, this.h, .5);

		if (this.hit.right.x != false || this.hit.left.x != false || this.hit.top.x != false|| this.hit.bottom.x != false){
			col = line.color;
			if (col === 1){
				this.g = true;
			}else if (col ===2){
				this.r = true;
			}else if (col ===3){
				this.b =true;
			}
		}
	}

	this.resetCol = function(){
		this.g = false;
		this.r = false;
		this.b = false;
	}

  
}

