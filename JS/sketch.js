
var level1DOT = [[9,13],[17,9],[21,3],[29,11]];
var answerArr = [[  //red, blue, green
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,4,5,6,7,8,9,10,11,0,0,0], 
                    [0,0,0,0,0,0,0,0,13,0,12,0,11,0,10,0,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                  ],
                  [
                  ]
                ];
var levelDotArr = [[
                      [9,13],[17,9],[21,3],[29,11]
                    ],
                    [
                      [2,2],[4,4]
                    ]

                  ];
var curLev = 0;                    


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

  p.correct = false;
  p.clickButt= false;

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
    p.button = p.createButton('PLAY ANSWER');
    p.button.position(window.innerWidth - 400, 0);
    p.button.style("background-color",p.color(25,23,200,50));
    p.button.mousePressed(p.playAnswer);
  }
  
  p.draw=function(){

    p.background(200);

    if (p.correct != false){
      p.stroke(200);
      p.textSize(30);
      p.text("CORRECT!", 500, p.YSCALE);
      p.textAlign(p.CENTER);
    }

    p.stroke(0);
    p.strokeWeight(20);
    //SLIDING PLAY BAR
    if (p.playing === true){
      p.strokeWeight(10);
      p.line(p.x1,window.innerHeight,p.x1,0);
      p.x1 = p.x1 + (window.innerWidth/30);
      if (p.x1 >= window.innerWidth){
        p.x1 = 0;
        p.playing = false;
      }
    }

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
    if (p.clickButt == false){
      p.currentInst.sArray[p.sectionMouseY].play();
      p.played = true;
    }
    p.clickButt = false;

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
      p.levelSelect(curLev +1);
    } else if (p.keyCode === 9) {  //tab key
      if (p.selected_line !== undefined){
        p.clearPatterns();
        //erase data from points
        p.selected_line.p1.disconnect();
        p.selected_line.p2.disconnect();
        //delete line from list
        var ind = p.lineArray.indexOf(p.selected_line);
        p.lineArray.splice(ind, 1);
        //take away selected line
        p.selected_line = undefined;
      }
    } //press 'P' to compile boxs and play melody
    else if (p.keyCode === 80){
      if (p.lineArray.length > 0){
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
      //check for double notes
      p.pianoPat = p.clean(p.pianoPat);
      p.synthPat = p.clean(p.synthPat);
      p.percPat = p.clean(p.percPat);
      console.log(p.pianoPat);
      console.log(p.synthPat);
      console.log(p.percPat);
      p.playback();

    }
  }
  }

  p.clearPatterns = function(){
    console.log("CLEARING");
    //reset patterns
    p.pianoPat = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    p.synthPat = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    p.percPat = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

    //reset colours in boxses
    for (var h=0; h< p.ySplit; h++){
      for (var w =0; w<p.xSplit; w++){
        p.boxArray[h][w].resetCol();
        // console.log("made");
      }
    }

    console.log(p.pianoPat);
    console.log(p.synthPat);
    console.log(p.percPat);
  }

  p.clean = function(patternArr){
    var returnArr = patternArr;
    //data is tracking array
    var data = [];
    var length = returnArr.length; 

    for(var i = 0; i < length; i++) {
      data.push(false);
    }
    for (var i =1; i < returnArr.length; i++){
      if (returnArr[i] === returnArr[i-1]){
        data.splice(i, 1, true);
      }
    }
    for (var i =1; i < returnArr.length; i++){
      if (data[i] === true){
        returnArr.splice(i, 1, 0);
      }
    }

    return returnArr;
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
    answer = p.checkAnswer();
    if (answer == true){
      p.correct = true;
    }
  }

  p.checkAnswer = function(){

    for (var i=0; i<p.xSplit; i++){
      if (answerArr[curLev][0][i] !== p.pianoPat[i]){
        return false;
      }
      if (answerArr[curLev][1][i] !== p.synthPat[i]){
        return false;
      }
      if (answerArr[curLev][2][i] !== p.percPat[i]){
        return false;
      }
    }
    return true;

  }

  p.playAnswer = function(){
    p.clickButt = true;

    p.myPart = new p5.Part();
    p.myPart.addPhrase(new p5.Phrase("p",p.playPiano,answerArr[curLev][0]));
    p.myPart.addPhrase(new p5.Phrase("s",p.playSynth,answerArr[curLev][1]));
    p.myPart.addPhrase(new p5.Phrase("p",p.playPerc,answerArr[curLev][2]));
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

    for (var i=0;i<levelDotArr[curLev].length; i++){
      console.log("made");
      var point = new pointClass(p, levelDotArr[curLev][i][0]*p.XSCALE, levelDotArr[curLev][i][1]*p.YSCALE);
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


  p.levelSelect = function (levelNum){
    if (levelNum < levelDotArr.length){
      curLev = levelNum;
      p.pointArray = [];
      console.log(curLev);
      p.reset();
    } 
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

