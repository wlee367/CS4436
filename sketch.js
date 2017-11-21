
var level1DOT = [[1,1], [1,3], [7,6], [11,10]];
var currentLevel = level1DOT;


var sketch = function(p){
  p.pointArray = [];
  p.lineArray = [];
  p.selected_point;
  p.selected_line;

  p.ySplit = 16;
  p.xSplit = 32;
  //height scaled
  p.YSCALE = (window.innerHeight/p.ySplit);
  p.XSCALE = (window.innerWidth/p.xSplit);


  p.boxArray;

  //images
  p.blue;
  p.red;
  p.green;

  //current Color Selected
  p.currentCol; //1=green, 2 = red, 3 = blue, 0 = black

  //Sound Classes
  p.piano;
  p.pianoPat =[]; //array of paino notes len=xSplit Phrase
  p.synth;
  p.synthPat=[]; //array of synth notes len=xSplit Phrase
  p.perc;
  p.percPat=[]; //array of perc notes len=xSplit Phrase

  //Part class (to play all the sounds)
  p.myPart;
  p.playing = false;
  p.x1 = 0;

  p.currentInst;
  //for dragging
  p.sectionMouseY; //checks where the mouse is on y axis (used for switching sounds)
  p.played = false;

  p.preload =function(){ 

    
    p.blue = p.loadImage("/assets/paintCanBLUE.png");
    p.red = p.loadImage("/assets/paintCanRED.png");
    p.green = p.loadImage("assets/paintCanGREEN.png");

    p.piano = new Piano(p);
    p.synth = new Synth(p);
    p.perc = new Perc(p);

    //select init instrument an color to start
    p.currentCol = 3;
    p.currentInst =p.synth;

    //create invisable boxs
      //create 2d array
    p.boxArray = new Array(p.xSplit);
    for (z = 0; z < p.xSplit; z++) {
      p.boxArray[z] = new Array(p.ySplit);
    }
      //create boxses
    for (var h=0; h< p.ySplit; h++){
      for (var w =0; w<p.xSplit; w++){
        p.box = new Box(p, w*p.XSCALE, h*p.YSCALE, p.XSCALE, p.YSCALE);
        p.boxArray[h][w] = p.box;
        // console.log("made");
      }
    }

    //init for Patern arrays
    for (var i= 0; i < p.xSplit; i++){
      p.pianoPat.push(0);
      p.synthPat.push(0);
      p.percPat.push(0);
    }

  }

  p.setup = function(){
    p.canvas = p.createCanvas(window.innerWidth, window.innerHeight);
    p.reset();

  }
  p.draw=function(){

    p.background(200);
    p.stroke(0);
    p.strokeWeight(20);

    //SLIDING PLAY BAR
    // if (p.playing === true){
    //   p.line(p.x1,window.innerHeight,p.x1,0);
    //   p.x1 = p.x1 + (54);
    //   if (p.x1 >= window.innerWidth){
    //     p.x1 = 0;
    //     p.playing = false;
    //   }
    // }

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
 
    }

    //draw paint cans
    //with current tint
    if (p.currentCol === 1){
      p.currentInst = p.perc;
      p.noTint();
      p.image(p.green, (innerWidth-300),0, 75, 100);
      p.tint(255, 126);
      p.image(p.red, (innerWidth-200),0, 75, 100);
      p.image(p.blue, (innerWidth-100),0, 75, 100);
    }else if (p.currentCol === 2){
      p.currentInst =p.piano;
      p.noTint();
      p.image(p.red, (innerWidth-200),0, 75, 100);
      p.tint(255, 126);
      p.image(p.green, (innerWidth-300),0, 75, 100);
      p.image(p.blue, (innerWidth-100),0, 75, 100);
    }else if (p.currentCol === 3){
      p.currentInst =p.synth;
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
    // console.log(p.sectionMouseY);  
    p.currentInst.sArray[p.sectionMouseY].play();
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
      p.currentInst.sArray[p.sectionMouseY].play();
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
    } //press ENTER to compile boxs
    else if (p.keyCode === 13){
      console.log("enter press");
      //cycle through all boxes
      for (var h=0; h< p.ySplit; h++){
        for (var w =0; w< p.xSplit; w++){
          //cycle through all lines
          for (var index = 0; index < p.lineArray.length; index++){
            p.boxArray[h][w].collide(p.lineArray[index]); //finds collision points and updates box class
          }
          //x-yspots are place in the 16/32 array
          xspot =p.boxArray[h][w].x/p.XSCALE;
          yspot =p.boxArray[h][w].y/p.YSCALE;

          if (p.boxArray[h][w].r === true){
            p.pianoPat.splice(xspot, 1, yspot);
          }
          if (p.boxArray[h][w].b === true){
            p.synthPat.splice(xspot, 1, yspot);
          }
          if (p.boxArray[h][w].g === true){
            p.percPat.splice(xspot, 1, yspot);
          }
        }
      }
      p.playback();
      console.log(p.pianoPat);
      console.log(p.synthPat);
      console.log(p.percPat);
      
    }
  }

  //plays back
  p.playback = function(){
    var pianoPhrase = new p5.Phrase("piano", p.playPiano, p.pianoPat);
    var synthPhrase = new p5.Phrase("synth", p.playSynth, p.synthPat);
    var percPhrase = new p5.Phrase("perc", p.playPerc, p.percPat);

    p.myPart = new p5.Part();
    p.myPart.addPhrase(pianoPhrase);
    p.myPart.addPhrase(synthPhrase);
    p.myPart.addPhrase(percPhrase);
    p.myPart.setBPM(120);

    //Play part and set playing to true for slider
    p.myPart.start();
    p.playing = true;



  }

  p.playPiano = function(time, playbackRate){
    p.piano.sArray[playbackRate].play(time);
  }
  p.playSynth = function(time, playbackRate){
    p.synth.sArray[playbackRate].play(time);
  }
  p.playPerc = function(time, playbackRate){
    p.perc.sArray[playbackRate].play(time);
  }

  //creates fresh points
  p.reset = function() {

    for (var i=0;i<currentLevel.length; i++){
      console.log("made");
      var point = new pointClass(p, currentLevel[i][0]*p.XSCALE, currentLevel[i][1]*p.YSCALE);
      p.pointArray.push(point);
      console.log(point.x, point.y);
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


var main = function(){
  //go to main screen


  //if level pressed go to level1
  var myP5 = new p5(sketch);

}

main();

