var circleX = 0;
var circleY = 0;

/*
* Kind of like using a JSON array
  to access variables x,y, diameter
  use square.x
  square.y
  square. diameter
*/
var square = {
	x: 0,
	y: 200, 
	diameter: 50
}; 

function setup(){
	createCanvas(600,400);

}

function draw(){
	// the create canvas () uses this function to draw

	background(250,250,100);
	
	noStroke();
	fill(250,200,200);
	/*using the mouseX and mouseY lets the mouse
	control your shape and where it gets drawn*/
	//ellipse(mouseX,mouseY,100,100);

	/*
	you can make it go to different places by declaring
	variables
	*/
	rect(circleX,circleY,34,34);
	circleX = circleX + 1;
	circleY = circleY + 0.5;

	ellipse(circleY, circleX, 34,34);
	circleX = circleX + 1;
	circleY = circleY + 0.5;

	rect(square.x, square.y, square.diameter,40);

	/*map() function could be useful for us: video link:
	https://www.youtube.com/watch?v=nicMAoW6u1g&list=PLRqwX-V7Uu6Zy51Q-x9tMWIv9cueOFTFA&t=552*/
	
}

/*
* Think "onButtonPressed" method in normal JS
*/
function mousePressed(){
	background(250,250,0);
}