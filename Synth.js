// Synth Class
function Synth(canvas){
	this.sArray = [];
	//load sounds
	this.sArray.push(canvas.loadSound("/assets/synth/16.mp3"));
	this.sArray.push(canvas.loadSound("/assets/synth/15.mp3"));
	this.sArray.push(canvas.loadSound("/assets/synth/14.mp3"));
	this.sArray.push(canvas.loadSound("/assets/synth/13.mp3"));
	this.sArray.push(canvas.loadSound("/assets/synth/12.mp3"));
	this.sArray.push(canvas.loadSound("/assets/synth/11.mp3"));
	this.sArray.push(canvas.loadSound("/assets/synth/10.mp3"));
	this.sArray.push(canvas.loadSound("/assets/synth/9.mp3"));
	this.sArray.push(canvas.loadSound("/assets/synth/8.mp3"));
	this.sArray.push(canvas.loadSound("/assets/synth/7.mp3"));
	this.sArray.push(canvas.loadSound("/assets/synth/6.mp3"));
	this.sArray.push(canvas.loadSound("/assets/synth/5.mp3"));
	this.sArray.push(canvas.loadSound("/assets/synth/4.mp3"));
	this.sArray.push(canvas.loadSound("/assets/synth/3.mp3"));
	this.sArray.push(canvas.loadSound("/assets/synth/2.mp3"));
	this.sArray.push(canvas.loadSound("/assets/synth/1.mp3"));


	//set the volume
	var vol = 0.3;
	for (var i=0; i <this.sArray.length; i++){
		this.sArray[i].setVolume(vol);
	}
  
}

