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

function preload(){
	songArray = [
		'assets/01 This Is Gospel.m4a',
		'assets/02 Miss Jackson (feat. Lolo).m4a',
	];

 	song = loadSound(songArray[1]);

}
function setup(){
  createCanvas(windowWidth, windowHeight);
  current = createVector(0,0);
  previous = createVector(0,0);
}

function draw(){
	// the create canvas () uses this function to draw
	background(200);

	if(millis() > next && painting){
		current.x = mouseX;
		current.y = mouseY;

		var force = p5.Vector.sub(current, previous);
		force.mult(0.05);

		paths[paths.length -1].add(current, force);
		next = millis() + random(100);

		previous.x = current.x;
    	previous.y = current.y;
	}
	 // Draw all paths
  for( var i = 0; i < paths.length; i++) {
    paths[i].update();
    paths[i].display();
  }
  console.log(paths);
}


// Start it up
function mousePressed() {
  next = 0;
  painting = true;
  previous.x = mouseX;
  previous.y = mouseY;
  paths.push(new Path());

  // if(!song.isPlaying()){
  // 	song.play();
  // }
}

function mouseDragged(){
	if(!song.isPlaying() || song.isPaused()){
		song.play();
	}
}
// Stop
function mouseReleased() {
  painting = false;
  if(song.isPlaying()){
  	song.pause();
  }
}

// A Path is a list of particles
function Path() {
  this.particles = [];
  this.hue = random(100);
}

Path.prototype.add = function(position, force){
	this.particles.push(new Particle(position, force, this.hue));
}

// Display plath
Path.prototype.update = function() {  
  for (var i = 0; i < this.particles.length; i++) {
    this.particles[i].update();
  }
}  

// Display plath
Path.prototype.display = function() {
  
  // Loop through backwards
  for (var i = this.particles.length - 1; i >= 0; i--) {
    // If we shold remove it
    if (this.particles[i].lifespan <= 0) {
      this.particles.splice(i, 1);
    // Otherwise, display it
    } else {
      this.particles[i].display(this.particles[i+1]);
    }
  }
}  

// Particles along the path
function Particle(position, force, hue) {
  this.position = createVector(position.x, position.y);
  this.velocity = createVector(force.x, force.y);
  this.drag = 0.95;
  this.lifespan = 255;
}

Particle.prototype.update = function() {
  // Move it
  this.position.add(this.velocity);
  // Slow it down
  this.velocity.mult(this.drag);
  // Fade it out
  this.lifespan--;
}

// Draw particle and connect it with a line
// Draw a line to another
Particle.prototype.display = function(other) {
  stroke(0, this.lifespan);
  fill(0, this.lifespan/2);    
  ellipse(this.position.x,this.position.y, 8, 8);    
  // If we need to draw a line
  if (other) {
    line(this.position.x, this.position.y, other.position.x, other.position.y);
  }
}

function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
}
