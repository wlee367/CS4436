var pointArray = [];
var lineArray = [];
var selected_point;

var blue;
var red;
var green;

var r = 0; //RGB red
var g = 0; //RGB green
var b = 0; //RGB blue

function preload(){
  song1 = loadSound('/assets/01 This Is Gospel.m4a');
  song2 = loadSound('/assets/02 Miss Jackson (feat. Lolo).m4a');
  song3 = loadSound('/assets/02 Miss Jackson (feat. Lolo).m4a');
  song4 = loadSound('/assets/02 Miss Jackson (feat. Lolo).m4a');

  // blue = loadImage("/assets/bluepaintbucket.JPG");
  // red = loadImage("/assets/redpaintbucket.JPG");
  // green = loadImage("/assets/greenpaintbucket.JPG");
}

function setup(){
  cnv = createCanvas(800, 600);

  p1 = new pointClass(300,300);
  p2 = new pointClass(400,500);
  p3 = new pointClass(600,300);
  p4 = new pointClass(500,500);

  pointArray.push(p1, p2, p3, p4);

  for(var i = 0; i<pointArray.length; i++){
    //var point = pointArray[i];
    pointArray[i].color_array.push(r,g,b);
  }
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
    //console.log('hello');
      for(var j = 0; j< p1.connections_array.length; j++){
        var p2 = p1.connections_array[j];
        //console.log('hello again');
          drawLine(p1.x, p1.y, p2.x, p2.y);
      }
  }

  // image(blue, 0,0);
  // image(red, 100,0);
  // image(green, 200, 0);
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
          //console.log(p1.color_array);
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
  //return r;
}

function changeGreen() {
  r = 0; g = 255; b = 0;
  //return g;
}

function changeBlue() {
  r = 0; g = 0; b = 255;
  //return b;
}

function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
}



