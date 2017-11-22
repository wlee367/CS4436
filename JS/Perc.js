// Percussion Class
function Perc(canvas){
	this.sArray = [];
	//load sounds
	this.sArray.push(canvas.loadSound("/assets/perc/13.mp3"));
	this.sArray.push(canvas.loadSound("/assets/perc/12.mp3"));
	this.sArray.push(canvas.loadSound("/assets/perc/11.mp3"));
	this.sArray.push(canvas.loadSound("/assets/perc/7.mp3"));
	this.sArray.push(canvas.loadSound("/assets/perc/10.mp3"));
	this.sArray.push(canvas.loadSound("/assets/perc/7.mp3"));
	this.sArray.push(canvas.loadSound("/assets/perc/9.mp3"));
	this.sArray.push(canvas.loadSound("/assets/perc/8.mp3"));
	this.sArray.push(canvas.loadSound("/assets/perc/7.mp3"));
	this.sArray.push(canvas.loadSound("/assets/perc/6.mp3"));
	this.sArray.push(canvas.loadSound("/assets/perc/8.mp3"));
	this.sArray.push(canvas.loadSound("/assets/perc/5.mp3"));
	this.sArray.push(canvas.loadSound("/assets/perc/4.mp3"));
	this.sArray.push(canvas.loadSound("/assets/perc/3.mp3"));
	this.sArray.push(canvas.loadSound("/assets/perc/2.mp3"));
	this.sArray.push(canvas.loadSound("/assets/perc/1.mp3"));

	//set the volume
	var vol = 0.3;
	for (var i=0; i <this.sArray.length; i++){
		this.sArray[i].setVolume(vol);
	}
  
}

