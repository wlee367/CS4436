
var level1DOT = [[9,13],[17,9],[21,3],[29,11]];
var answerArr = [[  //red, blue, green
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,4,5,6,7,8,9,10,11,0,0,0], 
                    [0,0,0,0,0,0,0,0,13,0,12,0,11,0,10,0,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                  ],
                  [
                   [0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 9, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                  ], 
                  [
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,3,0,4,0,5,0,6,7,0,8,0,9,0,10,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,2,0,0,0,0,0,0,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                  ], 
                  [
                    [0,0,0,2,3,5,6,8,10,11,13,15,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                  ]
                ];
var levelDotArr = [[
                      [9,13],[17,9],[21,3],[29,11]
                    ],
                    [
                      [10, 14], [13,10], [12, 9], [12,5]
                    ],
                    [
                    [3,3], [6,2], [17,11], [13,8]
                    ],
                    [
                    [4,2], [2,12], [4, 12], [12, 15], [12, 22]
                    ]

                  ];
var curLev = 0;
var maxLev = 4;                    


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

    p.sfx_level_completed = p.loadSound("/assets/sfx_ui/sfx_level_completed.wav");
    p.ui_menu_forward = p.loadSound("/assets/sfx_ui/ui_menu_forward.wav");
    p.ui_menu_backwards = p.loadSound("/assets/sfx_ui/ui_menu_backward.wav");
    p.ui_select_paintcan = p.loadSound("/assets/sfx_ui/ui_select_paintcan.wav");
    p.ui_select_playback = p.loadSound("/assets/sfx_ui/ui_select_playback.wav");

    p.blue = p.loadImage("/assets/paintCanBLUE.png");
    p.red = p.loadImage("/assets/paintCanRED.png");
    p.green = p.loadImage("assets/paintCanGREEN.png");

    p.question_answer = p.loadImage("assets/ic_question_answer_black_24px.svg");
    p.next_arrow_button = p.loadImage("assets/ic_keyboard_arrow_right_black_24px.svg");
    p.prev_arrow_button = p.loadImage("assets/ic_keyboard_arrow_left_black_24px.svg");
    p.back_button = p.loadImage("assets/ic_arrow_back_black_36px.svg")

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
    var myDivButtonOne = p.createDiv('');
    var myDivButtonTwo = p.createDiv('');

    p.frameRate(120);

    p.canvas = p.createCanvas(window.innerWidth, window.innerHeight); 
    p.reset();

    p.button = p.createButton('Play MmmDot');
    //p.button.position((window.innerWidth - window.innerWidth)+100, 0);
    //p.button.position((window.screen.width)/20, 0);
      
    p.button.position((p.XSCALE)*2, 0);
    p.button.style.position = "relative";
    p.button.style("background-color",p.color(25,23,200,50));
    p.button.style("width", "145px");
    p.button.style("height", "40px");
    p.button.style("text-align", "center");
    p.button.style("border", "2px solid");
    p.button.style("border-radius", "10px");
    p.button.style("border-color", "purple");
    p.button.style("font-size", "12px");
    p.button.mousePressed(p.playAnswer);
 

    p.button = p.createButton('Play MY MmmDot');
    //p.button.position((window.innerWidth - window.innerWidth)+350, 0);
    //p.button.position((window.screen.width)/3.8, 0);
    p.button.position((p.XSCALE)*7, 0);
    p.button.style.position = "relative";
    p.button.style("background-color",p.color(25,23,200,50));
    p.button.style("width", "120px");
    p.button.style("height", "40px");
    p.button.style("text-align", "center");
    p.button.style("border", "2px solid");
    p.button.style("border-radius", "10px");
    p.button.style("border-color", "purple");
    p.button.style("font-size", "12px");
    p.button.mousePressed(p.play_what_i_have);
  }

  p.draw=function(){

    p.background(200);

    /*
    *    p.sfx_level_completed = p.loadSound("/assets/sfx_ui/sfx_level_completed.wav");
    p.ui_menu_forward = p.loadSound("/assets/sfx_ui/ui_menu_forward.wav");
    p.ui_menu_backwards = p.loadSound("/assets/sfx_ui/ui_menu_backward.wav");
    p.ui_select_paintcan = p.loadSound("/assets/sfx_ui/ui_select_paintcan.wav");
    p.ui_select_playback = p.loadSound("/assets/sfx_ui/ui_select_playback.wav");
    */
    if (p.correct != false){ // are you fucking kidding jake
      //console.log("correct!");
     p.stroke(200);
     p.textSize(30);
      p.text("CORRECT!", 500, p.YSCALE + 300);

      //p.textAlign(p.CENTER);

    }

    p.stroke(0);
    //SLIDING PLAY BAR
    if (p.playing === true){
      p.strokeWeight(10);
      p.line(p.x1,window.innerHeight,p.x1,0);
      p.x1 = p.x1 + (window.innerWidth/28);
      if (p.x1 >= window.innerWidth){
        p.x1 = 0;
        p.playing = false;
      }
    }

    //perc square
    if (p.currentCol == 1){
      p.stroke(0,255,0);
      p.strokeWeight(2);
      p.fill(0,255,0);
      p.rect(p.mouseX-25,p.mouseY-25, 50,50, 20);
    }


    p.stroke(0);
    p.strokeWeight(20);
    //CALC where mouse is on Y axis --for playing sounds when mosue is clicked/dragged
    //check if it changes
    p.oldsectionY = p.sectionMouseY;
    p.sectionMouseY = Math.floor(p.mouseY/p.YSCALE);
    if (p.oldsectionY !== p.sectionMouseY){
      p.played = false;
    }

    //draw slected line
    if (p.selected_line !== undefined){
      p.drawSelectLine();
    }

    //draw points
    for(var i = 0; i <p.pointArray.length; i++){
      p.stroke(0);
      p.strokeWeight(20);
      p.pointArray[i].display();
    }

    //draw lines
    for (var index = 0; index < p.lineArray.length; index++){
      p.drawLine(p.lineArray[index]);
 
    }

    //draw nav bar
    p.noStroke();
    p.strokeWeight(2);
    p.fill(255,255,255,[0.3]);
    p.rect(0,0, window.innerWidth, window.innerHeight/16);
    //draw paint cans
    //with current tint
    if (p.currentCol === 1){
      p.currentInst = p.perc;
      p.noTint();
      p.image(p.green, (innerWidth-300),0, 35, 40);
      p.tint(255, 126);
      p.image(p.red, (innerWidth-200),0, 35, 40);
      p.image(p.blue, (innerWidth-100),0, 35, 40);
    }else if (p.currentCol === 2){
      p.currentInst =p.piano;
      p.noTint();
      p.image(p.red, (innerWidth-200),0, 35, 40);
      p.tint(255, 126);
      p.image(p.green, (innerWidth-300),0, 35, 40);
      p.image(p.blue, (innerWidth-100),0, 35, 40);
    }else if (p.currentCol === 3){
      p.currentInst =p.synth;
      p.noTint();
      p.image(p.blue, (innerWidth-100),0, 35, 40);
      p.tint(255, 126);
      p.image(p.green, (innerWidth-300),0, 35, 40);
      p.image(p.red, (innerWidth-200),0, 35, 40);
    }

    //Draw Tutorial button - on click we want this to show a popup button
    //ic_question_answer_black_24px.svg
    p.image(p.question_answer, (window.innerWidth-450), 0, 35,45);

    //Display Current Level

    p.display_level = curLev+1; //get current level and add 1 because current level is 0 by default @jake
    p.textSize(34);
    p.fill(50);   
    p.text("Level "+ p.display_level , ((window.innerWidth/2)-50), window.innerHeight/19);

    /*Draw left and right arrows for next level - these buttons will be assigned a 
    * specific coordinates so its easy to detect mousePressed so Jake or hannah or Jason can 
    * go in and implement next and previous level stuff
    */

    p.image(p.next_arrow_button, ((window.innerWidth/2)+70), ((window.innerHeight)/200), 35,45);  //right arrow
    p.image(p.prev_arrow_button, ((window.innerWidth/2)-95), ((window.innerHeight)/200), 35,45);  //Left arrow

    //Draw back button, on pressed this button will take the user back to index.html
    p.image(p.back_button, 0, 0, 35,45);
  }
  p.play_what_i_have = function(){
      var percSend = false;
      for (var i=0; i<p.pointArray.length; i++){
        if (p.pointArray[i].connectedPerc){
          percSend = true;
        }   
      }

      if (p.lineArray.length > 0 || percSend == true){
      console.log("enter play");
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

          //perc collison
          for (var i=0; i<p.pointArray.length; i++){
            if (p.pointArray[i].connectedPerc){
              p.boxArray[h][w].collidePerc(p.pointArray[i]);
            }   
          }

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
      }        //check for double notes
      p.pianoPat = p.clean(p.pianoPat);
      p.synthPat = p.clean(p.synthPat);
      p.percPat = p.clean(p.percPat);
      console.log(p.pianoPat);
      console.log(p.synthPat);
      console.log(p.percPat);
      p.playback();
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
    p.stroke(255,215,0);
    if (p.selected_line.p1 != undefined){
      p.strokeWeight(30);
      p.line(p.selected_line.p1.x,p.selected_line.p1.y,p.selected_line.p2.x, p.selected_line.p2.y);
    }else{ //selected line is a perc point
      p.strokeWeight(2);
      p.fill(255,215,0);
      p.rect(p.selected_line.x-30,p.selected_line.y-30, 60,60, 20);
    }
  }


  p.mousePressed = function(){
    //play initial sound based on p.sectionMouseY
    if ( p.mouseY > p.YSCALE){
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
          //if it is perc
          if (p.currentCol == 1){
            p.selected_point.connectedPerc = true;
            p.selected_point.connected = true;
          }
          if (p.selected_point.connected === true){
            if (p.selected_point.connectedPerc == true){
              p.selected_line =p.selected_point;
            }else{
              p.selected_line = p.selected_point.attachedLine;
            }
          }
        }
      }

    p.de = p.dist(0,0,p.mouseX, p.mouseY);
    if(p.de < 45){
      //take the user back to index.html
      window.open("/index.html", "_self");
      console.log("fire");
    }

    /*
     p.image(p.next_arrow_button, ((window.innerWidth/2)+70), ((window.innerHeight)/200), 35,45);  //right arrow
    p.image(p.prev_arrow_button, ((window.innerWidth/2)-95), ((window.innerHeight)/200), 35,45);  //Left arrow
    */
    p.distance_right_arrow = p.dist(((window.innerWidth/2)+70), (window.innerHeight/200), p.mouseX, p.mouseY);
    if(p.distance_right_arrow < 45){
      console.log("hey");
      // p.reset();
      if (p.selected_line !== undefined){
        p.clearPatterns();
        //erase data from points
        if (p.selected_line.p1 != undefined){ //if not perc dot
          p.selected_line.p1.disconnect();
          p.selected_line.p2.disconnect();
          //delete line from list
          var ind = p.lineArray.indexOf(p.selected_line);
          p.lineArray.splice(ind, 1);
        }else{ //if perc dot
          p.selected_line.disconnect();
        }
        //take away selected line
        p.selected_line = undefined;
      }
      p.correct = false;
      p.ui_menu_forward.play();
      p.clearPatterns();
      p.levelSelect(curLev + 1);
    }

    p.distance_left_arrow = p.dist(((window.innerWidth/2)-95), ((window.innerHeight)/200), p.mouseX, p.mouseY);
    if(p.distance_left_arrow < 45){
      console.log("they always ask wyd but never hyd");
      if(curLev != 0){
        // p.reset();
        // p.clearPatterns()
      if (p.selected_line !== undefined){
        p.clearPatterns();
        //erase data from points
        if (p.selected_line.p1 != undefined){ //if not perc dot
          p.selected_line.p1.disconnect();
          p.selected_line.p2.disconnect();
          //delete line from list
          var ind = p.lineArray.indexOf(p.selected_line);
          p.lineArray.splice(ind, 1);
        }else{ //if perc dot
          p.selected_line.disconnect();
        }
        //take away selected line
        p.selected_line = undefined;
      }
        p.correct = false;
        p.ui_menu_backwards.play();
        p.levelSelect(curLev-1);
      }
    }

    // p.image(p.question_answer, (innerWidth-450), 0, 35,45);
    p.distance_question = p.dist((window.innerWidth-450), 0, p.mouseX, p.mouseY);
    if(p.distance_question < 45){
      window.open("/index.html", "_blank");
    }


    p.distance_play_what_i_am_supposed = p.dist((p.XSCALE)*2, 0, p.mouseX, p.mouseY);
    if(p.distance_play_what_i_am_supposed < 45){
      p.ui_select_playback.play();
    }

    p.distance_tutorial_button = p.dist((window.innerWidth-450), 0, p.mouseX, p.mouseY);
    if(p.distance_tutorial_button < 35){
      p.ui_select_playback.play();
    }
  }
  p.mouseDragged = function(){

    //play sound when mouse is dragged
    if (!p.played){
      p.currentInst.sArray[p.sectionMouseY].play();
      p.played = true;
    }

    //check for drawing lines
    if (p.currentCol != 1){
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
  }

  /*
  Press 1, 2, or 3 to change colours
  Press TAB to delete the selected line
  */
  p.keyPressed = function(){
    if (p.keyCode === 49) {
      p.changeGreen();
      p.ui_select_paintcan.play();
    } else if (p.keyCode === 50) {
      p.changeRed();
      p.ui_select_paintcan.play();
    } else if (p.keyCode === 51) {
      p.changeBlue();
      p.ui_select_paintcan.play();
      // p.levelSelect(curLev +1);
    } else if (p.keyCode === 9) {  //tab key
      if (p.selected_line !== undefined){
        p.clearPatterns();
        //erase data from points
        if (p.selected_line.p1 != undefined){ //if not perc dot
          p.selected_line.p1.disconnect();
          p.selected_line.p2.disconnect();
          //delete line from list
          var ind = p.lineArray.indexOf(p.selected_line);
          p.lineArray.splice(ind, 1);
        }else{ //if perc dot
          p.selected_line.disconnect();
        }
        //take away selected line
        p.selected_line = undefined;
      }
    } //press 'P' to compile boxs and play melody
    else if (p.keyCode === 80){
      var percSend = false;
      for (var i=0; i<p.pointArray.length; i++){
        if (p.pointArray[i].connectedPerc){
          percSend = true;
        }   
      }

      if (p.lineArray.length > 0 || percSend == true){
      console.log("enter play");
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

          //perc collison
          for (var i=0; i<p.pointArray.length; i++){
            if (p.pointArray[i].connectedPerc){
              p.boxArray[h][w].collidePerc(p.pointArray[i]);
            }   
          }

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
      p.lineArray = [];
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

