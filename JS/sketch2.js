function preload(){
	song = loadSound('/assets/mmmDot_TitleMusic_02.mp3');
}
function setup(){
	noCanvas();
	if(song.isPlaying()){
		song.stop();
	}else{
		song.play();
	}
}
