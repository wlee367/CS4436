var sketch = function(p){
  p.pointArray = [];
  p.lineArray = [];
  p.selected_point;
  p.selected_line;

  //height scaled
  p.YSCALE = (window.innerHeight/16);
  p.XSCALE = (window.innerWidth/32);

  //images
  p.blue;
  p.red;
  p.green;

  //current Color Selected
  p.currentCol = 1; //1=green, 2 = red, 3 = blue, 0 = black

  //Sound Classes
  p.piano;
  //for dragging
  p.sectionMouseY; //checks where the mouse is on y axis (used for switching sounds)
  p.played = false;

  p.preload =function(){ 
    
    p.blue = p.loadImage("/assets/paintCanBLUE.png");
    p.red = p.loadImage("/assets/paintCanRED.png");
    p.green = p.loadImage("assets/paintCanGREEN.png");

    p.piano = new Piano(p);
  }

  p.setup = function(){
    p.canvas = p.createCanvas(window.innerWidth, window.innerHeight);
    p.reset();
  }
  p.draw=function(){
    p.background(200);
    p.stroke(0);
    p.strokeWeight(20);
    
    //CALC where mouse is on Y axis --for playing sounds when mosue is clicked/dragged
    //check if it changes
    p.oldsectionY = p.sectionMouseY;
    p.sectionMouseY = Math.floor(p.mouseY/p.YSCALE);
    if (p.oldsectionY !== p.sectionMouseY){
      p.played = false;
    }

    //draw points
    for(var i = 0; i <p.pointArray.length; i++){
      p.pointArray[i].display();
    }

    //draw slected line
    if (p.selected_line !== undefined){
      p.drawSelectLine();
    }

    //draw lines
    for (var index = 0; index < p.lineArray.length; index++){
      p.drawLine(p.lineArray[index]);
      // if (p.lineArray[index].collide(p.mouseX,p.mouseY)){
      //   console.log("PRESSED");
        
      // } 
    }

    //draw paint cans
    //with current tint
    if (p.currentCol === 1){
      p.noTint();
      p.image(p.green, (innerWidth-300),0, 75, 100);
      p.tint(255, 126);
      p.image(p.red, (innerWidth-200),0, 75, 100);
      p.image(p.blue, (innerWidth-100),0, 75, 100);
    }else if (p.currentCol === 2){
      p.noTint();
      p.image(p.red, (innerWidth-200),0, 75, 100);
      p.tint(255, 126);
      p.image(p.green, (innerWidth-300),0, 75, 100);
      p.image(p.blue, (innerWidth-100),0, 75, 100);
    }else if (p.currentCol === 3){
      p.noTint();
      p.image(p.blue, (innerWidth-100),0, 75, 100);
      p.tint(255, 126);
      p.image(p.green, (innerWidth-300),0, 75, 100);
      p.image(p.red, (innerWidth-200),0, 75, 100);
    }
  }
  p.drawLine = function(thisLine){
    if (thisLine.color === 1){
      p.stroke(0,255,0);
    }else if (thisLine.color === 2){
      p.stroke(255,0,0);
    }
    else if (thisLine.color === 3){
      p.stroke(0,0,255);
    }
    p.strokeWeight(20);
    p.line(thisLine.p1.x,thisLine.p1.y,thisLine.p2.x,thisLine.p2.y);
  }
  p.drawSelectLine = function(){
    p.strokeWeight(30);
    p.stroke(255,215,0);
    p.line(p.selected_line.p1.x,p.selected_line.p1.y,p.selected_line.p2.x, p.selected_line.p2.y);
  }


  p.mousePressed = function(){
    //play initial sound based on p.sectionMouseY
    console.log(p.sectionMouseY);  
    p.piano.sArray[p.sectionMouseY].play();
    p.played = true;


  //select the nearest point
    for(var i =0; i < p.pointArray.length; i++){
        p.d = p.dist(p.pointArray[i].x, p.pointArray[i].y, p.mouseX, p.mouseY);
        if(p.d < 10){
          console.log('fire');
          p.selected_point = p.pointArray[i];
          if (p.selected_point.connected === true){
            p.selected_line = p.selected_point.attachedLine;
          }
        }
      }
  }
  p.mouseDragged = function(){

    //play sound when mouse is dragged
    if (!p.played){
      p.piano.sArray[p.sectionMouseY].play();
      p.played = true;
    }

    //check for drawing lines
    for(var i =0; i < p.pointArray.length; i++){
      d = p.dist(p.pointArray[i].x, p.pointArray[i].y, p.mouseX, p.mouseY);
      p1 = p.pointArray[i];
      if((p.selected_point) && (d<10) && (p1 !== p.selected_point) && (p1.connected === false) && (p.selected_point.connected === false)){

        newLine = new lineClass(p, p1, p.selected_point, p.currentCol);
        p.lineArray.push(newLine);
        console.log("New line from");
        p1.connected = true;
        p.selected_point.connected = true;
        p.selected_line = newLine;

        //setPoints attached line
        p1.attachedLine = newLine;
        p.selected_point.attachedLine = newLine;

      }
    }
  }

  /*
  Press 1, 2, or 3 to change colours
  Press TAB to delete the selected line
  */
  p.keyPressed = function(){
    if (p.keyCode === 49) {
      p.changeGreen();
    } else if (p.keyCode === 50) {
      p.changeRed();
    } else if (p.keyCode === 51) {
      p.changeBlue();
    } else if (p.keyCode === 9) {  //tab key
      if (p.selected_line !== undefined){
        //erase data from points
        p.selected_line.p1.disconnect();
        p.selected_line.p2.disconnect();
        //delete line from list
        var ind = p.lineArray.indexOf(p.selected_line);
        p.lineArray.splice(ind, 1);
        //take away selected line
        p.selected_line = undefined;
      }
    }
  }

  //creates fresh points
  p.reset = function() {
    
    var p1 = new pointClass(p,300,300);
    var p2 = new pointClass(p,400,500);
    var p3 = new pointClass(p,600,300);
    var p4 = new pointClass(p,500,500);

    p.pointArray.push(p1, p2, p3, p4);
    for(var i = 0; i<p.pointArray.length; i++){

    }
  }

  p.changeGreen = function() {
    p.currentCol = 1;
    console.log("changed green");
  }
   p.changeRed = function() {
    p.currentCol = 2;
    console.log("changed red");
  }
  p.changeBlue = function() {
    p.currentCol = 3;
    console.log("changed blue");
  }
  p.windowResized = function(){
   p.resizeCanvas(window.innerWidth, window.innerHeight);
  }
  
};



function resetScreen() {
     location.reload();
  }


var myP5 = new p5(sketch);

