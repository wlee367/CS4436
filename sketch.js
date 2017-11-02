var point;
var pointArray = [];
var lineArray = [];
var paths = []; 
var global_x;
var global_y;

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

  pointArray.push(p1);
  pointArray.push(p2);
  pointArray.push(p3);
  pointArray.push(p4);


  p1.connections_array.push(p2);
  p1.connections_array.push(p3);
  p1.connections_array.push(p4);

  global_x = -1;
  global_y = -1; 

}

function draw(){
  background(200);
  stroke(0);
  strokeWeight(20);
   
  pointArray[0].display();
  pointArray[0].return_coordinates();
  pointArray[1].display();
  pointArray[1].return_coordinates();
  pointArray[2].display();
  pointArray[2].return_coordinates();
  pointArray[3].display();
  pointArray[3].return_coordinates();
  
  for(var index = 0; index < lineArray.length; index++){
    if((mouseX != global_x)&&(mouseY != global_y)){
    drawLine(lineArray[index], lineArray[index+1], lineArray[index+2], lineArray[index+3]);
    global_x = -1;
    global_y = -1;
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
  //console.log('this function was activated');
  stroke(r, g, b);
  strokeWeight(20);
  line(x1, y1, x2, y2);
  //console.log('a line should have been drawn by now');
}

function mousePressed(){
  //select the nearest point

    
    //if the distance is close enough, then you've selected the point
    
    if((mouseX != global_x)&&(mouseY != global_y)){
      //if selected point is not -1, -1, 
      //keep track of the point
      for(var i =0; i < pointArray.length; i++){
        d = dist(pointArray[i].x, pointArray[i].y, mouseX, mouseY);
        if(d < 10){
          console.log('hello!');
          console.log(pointArray[i].x);
          console.log(pointArray[i].y);
          // drawLine(pointArray[i].x, pointArray[i].y, mouseX, mouseY);
          lineArray.push(pointArray[i].x, pointArray[i].y);
          console.log('hello again');

          console.log(lineArray);
          global_x, global_y = -1;
        }
        
      }

    }

  //when you click on a point, 
  /*
  * if selected point is not  -1, -1 (global variable)

  keep track of the point, draw a line from selected point to wherever the mouse 
  is. once you pick the second point, set selected point back to -1, -1, 

  Linearray - list of all the different lines you've drawn so far 
  once you draw a line, add it to this array
  for every line in the line array, draw the line in (draw()
  */
  
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



