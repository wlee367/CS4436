var point;
var x = 0; //boolean :D

var r = 0; //RGB red
var g = 0; //RGB green
var b = 0; //RGB blue


function preload(){
}

function setup(){
  cnv = createCanvas(800, 600);
}

function draw(){
  background(200);
  stroke(0);
  strokeWeight(20);
   

    p1 = new pointClass(300,300);
    p1.display();
    p1.return_coordinates();

    p2 = new pointClass(400, 500);
    p2.display();
    p2.return_coordinates();

    if(Boolean(x)){
      // drawLine(p1.x, p1.y, mouseX, mouseY);
      l1 = line(p1.x, p1.y, mouseX, mouseY);
    

      d = dist(mouseX, mouseY, p2.x, p2.y)
      if(d<100){
        // drawLine(p1.x, p1.y, p2.x, p2.y);
      }
    }

     
}
// point class
function pointClass(x,y){
  
  this.return_coordinates = function(){
    this.x = x;
    this.y = y;
  }
  this.display = function(){
    point(x,y);
  }
}

function mouseReleased(){
  clear();

}
function mouseDragged(){
  d = dist(mouseX, mouseY, p1.x, p1.y);
  e = dist(mouseX, mouseY, p2.x, p2.y);

  var check = d-e;
  if(check < 20){
    //console.log('you prssed!');
    x = 1; 
  }
}


function drawLine(x1, y1, x2, y2){
  //console.log('this function was activated');
  stroke(r, g, b);
  strokeWeight(20);
  line(x1, y1, x2, y2); // why does this not fire????
  //console.log('a line should have been drawn by now');
}

function changeRed() {
  r = 255; g = 0; b = 0;
}

function changeGreen() {
  r = 0; g = 255; b = 0;
}

function changeBlue() {
  r = 0; g = 0; b = 255;
}

function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
}



