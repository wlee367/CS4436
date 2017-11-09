var pointArray = [];
var lineArray = [];
var selected_point;

var x = 0; //boolean :D

var r = 0; //RGB red
var g = 0; //RGB green
var b = 0; //RGB blue

function preload(){
}

function setup(){
  cnv = createCanvas(800, 600);

  p1 = new pointClass(300,300);
  p2 = new pointClass(400, 500);
  p3 = new pointClass(600,300);
  p4 = new pointClass(500,500);

  pointArray.push(p1, p2, p3, p4);

}

function draw(){
  background(200);
  stroke(0);
  strokeWeight(20);
   
  for(var i = 0; i <pointArray.length; i++){
    pointArray[i].display();
    pointArray[i].return_coordinates();
  }
  
  for(var index = 0; index < pointArray.length; index++){
    var p1 = pointArray[index];
    console.log('hello');
      for(var j = 0; j< p1.connections_array.length; j++){
        var p2 = p1.connections_array[j];
        console.log('hello again');
          drawLine(p1.x, p1.y, p2.x, p2.y);
      }
  }
}
// point class
function pointClass(x,y){
  this.connections_array = [];

  this.return_coordinates = function(){
    this.x = x;
    this.y = y;
  }
  this.display = function(){
    point(x,y);
  }
  this.keep_track = function(p2){
    //keep track of the connections that are being made between two points. 
    connections_array.push(p2);

  }
}

function drawLine(x1, y1, x2, y2){
  stroke(r, g, b);
  strokeWeight(20);
  line(x1, y1, x2, y2);
}

function mousePressed(){
  //select the nearest point

    for(var i =0; i < pointArray.length; i++){
        var d = dist(pointArray[i].x, pointArray[i].y, mouseX, mouseY);
        if(d < 10){
          console.log('fire');
          selected_point = pointArray[i];
        }

    }
}

function mouseDragged(){
   for(var i =0; i < pointArray.length; i++){

      d = dist(pointArray[i].x, pointArray[i].y, mouseX, mouseY);
      p1 = pointArray[i];
      if((selected_point) && (d<10)){
        p1.connections_array.push(selected_point);
        selected_point.connections_array.push(p1);
      }
    }
}

function resetScreen() {
    location.reload();
}

function mouseReleased(){
  if(d>10){
    selected_point = null;
  }
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



