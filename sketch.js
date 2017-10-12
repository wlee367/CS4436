// All the paths
var paths = [];
// Are we painting?
var painting = false;
// How long until the next circle
var next = 0;
// Where are we now and where were we?
var current;
var previous;
var song;
var songArray = [];

var paintColour;

function preload(){

}
function setup(){
  createCanvas(800, 600);

}


function paintRed(){
    paintColour = "red"
}
function paintBlue(){
    paintColour = "blue"
}
function paintGreen(){
    paintColour = "green"
}

function draw(){
  background(200);
  stroke(0);
  strokeWeight(20);

  point(mouseX,mouseY);

  var x1 = 300;
  var y1 = 300;
  var x2 = 500;
  var y2 = 200;

  p1= new pointClass(x1,y1);
  p2= new pointClass(x2,y2);

  p1.check(x1,y1);


  beginShape();
    
  endShape();
    
     
}

function pointClass(x, y){
  point(x,y);
}
pointClass.prototype.check = function(x,y){
  var d = dist(mouseX,mouseY,x,y);
  if (d < 25){
      line(x,y, mouseX,mouseY);
  }
}

// Start it up
function mousePressed() {
  // next = 0;
  // painting = true;
  // previous.x = mouseX;
  // previous.y = mouseY;

  // // if(!song.isPlaying()){
  // // 	song.play();
  // // }
}

function mouseDragged(){
	// if(!song.isPlaying() || song.isPaused()){
	// 	song.play();
	// }
}
// Stop
function mouseReleased() {
  // painting = false;
  // if(song.isPlaying()){
  // 	song.pause();
  // }
}



function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
}
