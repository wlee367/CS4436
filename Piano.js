// Piano Class
function Piano(canvas){
	this.sArray = [];
	//load sounds
	this.sArray.push(canvas.loadSound("/assets/piano/Fs5.mp3"));
	this.sArray.push(canvas.loadSound("/assets/piano/E5.mp3"));
	this.sArray.push(canvas.loadSound("/assets/piano/D5.mp3"));
	this.sArray.push(canvas.loadSound("/assets/piano/Cs5.mp3"));
	this.sArray.push(canvas.loadSound("/assets/piano/B4.mp3"));
	this.sArray.push(canvas.loadSound("/assets/piano/A4.mp3"));
	this.sArray.push(canvas.loadSound("/assets/piano/G4.mp3"));
	this.sArray.push(canvas.loadSound("/assets/piano/Fs4.mp3"));
	this.sArray.push(canvas.loadSound("/assets/piano/E4.mp3"));
	this.sArray.push(canvas.loadSound("/assets/piano/D4.mp3"));
	this.sArray.push(canvas.loadSound("/assets/piano/Cs4.mp3"));
	this.sArray.push(canvas.loadSound("/assets/piano/B3.mp3"));
	this.sArray.push(canvas.loadSound("/assets/piano/A3.mp3"));
	this.sArray.push(canvas.loadSound("/assets/piano/G3.mp3"));
	this.sArray.push(canvas.loadSound("/assets/piano/Fs3.mp3"));
	this.sArray.push(canvas.loadSound("/assets/piano/E3.mp3"));


	//set the volume
	var vol = 0.3;
	for (var i=0; i <this.sArray.length; i++){
		this.sArray[i].setVolume(vol);
	}
  
}

