function preload(){
	song = loadSound('/assets/mmmDot_TitleMusic._final.mp3');
}
function setup(){
	noCanvas();
	if(song.isPlaying()){
		song.stop();
	}else{
		song.play();
	}
}
