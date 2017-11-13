var sketch = function(p){
  p.pointArray = [];
  p.lineArray = [];
  p.selected_point;

  p.blue;
  p.red;
  p.green;

  p.r = 0; //RGB red
  p.g = 0; //RGB green
  p.b = 0; //RGB blue

  p.preload =function(){ 
    p.song1 = p.loadSound('/assets/01 This Is Gospel.m4a');
    p.song2 = p.loadSound('/assets/02 Miss Jackson (feat. Lolo).m4a');
    p.song3 = p.loadSound('/assets/02 Miss Jackson (feat. Lolo).m4a');
    p.song4 = p.loadSound('/assets/02 Miss Jackson (feat. Lolo).m4a');
    
    p.blue = p.loadImage("/assets/bluepaintbucket.jpg");
    p.red = p.loadImage("/assets/redpaintbucket.jpg");
    p.green = p.loadImage("assets/greenpaintbucket.jpg");
  }

  p.setup = function(){
    p.canvas = p.createCanvas(800, 600);
    p.reset();
    p.button = p.createButton('Reset');
    p.button.position(320, 45);
    p.button.mousePressed(p.reset);
  }
  p.draw=function(){
    p.background(200);
    p.stroke(0);
    p.strokeWeight(20);
    for(var i = 0; i <p.pointArray.length; i++){
      p.pointArray[i].display();
      p.pointArray[i].return_coordinates();
    }
  
   for(var index = 0; index < p.pointArray.length; index++){
      var p1 = p.pointArray[index];
      //console.log('hello');
        for(var j = 0; j< p1.connections_array.length; j++){
          var p2 = p1.connections_array[j];
          // console.log('hello again');
          p.drawLine(p1.x, p1.y, p2.x, p2.y);
        }
      }
    p.image(p.blue, 0,0);
    p.image(p.red, 100,0);
    p.image(p.green, 200,0);
  }
  p.drawLine = function(x1, y1, x2, y2){
    p.stroke(p.r, p.g, p.b);
    p.strokeWeight(20);
    p.line(x1, y1, x2, y2);
  }
  p.mousePressed = function(){
  //select the nearest point
    for(var i =0; i < p.pointArray.length; i++){
        p.d = p.dist(p.pointArray[i].x, p.pointArray[i].y, p.mouseX, p.mouseY);
        if(p.d < 10){
          console.log('fire');
          //console.log(p1.color_array);
          p.selected_point = p.pointArray[i];
        }
      }
    //the blue can (95x105)
    if(p.mouseX > 0 && p.mouseX <= 95 && p.mouseY > 0 && p.mouseY <=105){
      p.changeBlue();
    }
    //the red can (95x105) []
    if(p.mouseX > 95 && p.mouseX <= 190 && p.mouseY > 0 && p.mouseY <= 105){
      p.changeRed();
    }
    //the red can
    if(p.mouseX > 190 && p.mouseX<=190+95 && p.mouseY>0 && p.mouseY<=105){
      p.changeGreen();
    }

  }
  p.mouseDragged = function(){
   for(var i =0; i < p.pointArray.length; i++){
      d = p.dist(p.pointArray[i].x, p.pointArray[i].y, p.mouseX, p.mouseY);
      p1 = p.pointArray[i];
      if((p.selected_point) && (d<10)){
        p1.connections_array.push(p.selected_point);
        p.selected_point.connections_array.push(p1);
      }
    }
  }
  p.reset = function() {
    console.log('why');
    var p1 = new pointClass(p,300,300);
    var p2 = new pointClass(p,400,500);
    var p3 = new pointClass(p,600,300);
    var p4 = new pointClass(p,500,500);
    console.log('hello?');
    p.pointArray.push(p1, p2, p3, p4);
    for(var i = 0; i<p.pointArray.length; i++){
      //var point = pointArray[i];
      p.pointArray[i].color_array.push(p.r,p.g,p.b);
      console.log('break this browser');
    }
  }
  p.mouseReleased = function(){
    if(p.d>10){
      p.selected_point = null;
    }   
  }
  p.changeRed = function() {
    p.r = 255; p.g = 0; p.b = 0;
  }
   p.changeGreen = function() {
    p.r = 0; p.g = 255; p.b = 0;
  }
  p.changeBlue = function() {
    p.r = 0; p.g = 0; p.b = 255;
  }
  p.windowResized = function(){
   p.resizeCanvas(windowWidth, windowHeight);
  }
};

var myP5 = new p5(sketch);
  