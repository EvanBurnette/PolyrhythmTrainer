var slider1, slider2;
var playBtn, stopBtn;
var bpm;
var beat1, beat2;
var step = 0;
var place = 0;
var count = 0;
var play = false;
var stick1;
var stick2;
var setFramerate = 60;

function preload() {
	stick1 = loadSound("assets/stick1.wav");
	stick2 = loadSound("assets/stick2.wav");
}

function setup() {
  	createCanvas(400, 400);
	slider1 = createSlider(1, 30, 2);
	slider2 = createSlider(1, 30, 3);
	createP();
	playBtn = createButton('Play');
	playBtn.mousePressed(function(){play = true;});
	stopBtn = createButton('Stop');
	stopBtn.mousePressed(function(){play = false;})
	bpm = createInput(60);
	createSpan('bpm');
	frameRate(setFramerate);
	beat1 = slider1.value();
	beat2 = slider2.value();
	stick1.setVolume(1);
	stick2.setVolume(1);
}

function drawNote(x, y, dir){
	ellipse(x, y,10,10);
	line(x + dir*5, y, x + dir*5, y - dir*30);
}

function findTotalTime(){
	let bps = bpm.value() / 60.0;
	let totalTime = beat1/bps; //in seconds
	return totalTime;
}

function buildTimingArrays(){
	let arrayLen = beat1*beat2/commonFactor;
	let array1 = [];
	for (let i = 0; i < arrayLen; i++){array1.push(false)}
	let array2 = [];
	for (let i = 0; i < arrayLen; i++){array2.push(false)}
	console.log(array1);
	for (let i = 0; i < beat1*beat2; i++){
		if (i % beat2 == 0){array1[i] = true;}
		else{}
		if (i % beat1 == 0){array2[i] = true;}
		else{}
	}
}

function draw() {
	beat1 = slider1.value();
	beat1last = beat1;
	beat2 = slider2.value();
	beat2last = beat2;
	let biggestBeat = max(beat1, beat2);
	let size = min(width-50, biggestBeat * 33);

  	background(255);
	translate(width/2, height/2);
	stroke(0);
	fill(0,0,0);
	let start = -size/2;
	let end = size/2;
	push();
	stroke(color(255, 0, 0, 127));
	strokeWeight(3);
	for (let i = 0; i <= beat1; i++){
		line(start + i*(end-start)/beat1, -height/2, start + i*(end-start)/beat1, height/2);
	}
	pop();
	push();
	stroke(color(0, 0, 255, 127));
	strokeWeight(3);
	for (let i = 0; i <= beat2; i++){
		line(start + i*(end-start)/beat2, -height/2, start + i*(end-start)/beat2, height/2);
	}
	pop();
	for (let i = 0; i < beat1; i++){
		drawNote(start + i*(end-start)/beat1, -10, 1);
	}

	for (let i = 0; i < beat2; i++){
		drawNote(start + i*(end-start)/beat2, 10, -1);
	}
	text(beat1, start - 23, -5);
	text(beat2, start - 23, 15);

	if (play){
	push();
	stroke(color(0,0,0,127));
	strokeWeight(3);
	line(place, -height/2, place, height/2);
	let bps = bpm.value()/60.0;
	step = ((size/biggestBeat)/setFramerate)*bps;
	place = step*count + start;
	
	let countTotal = (size/step);
	let beat1Trig = Math.floor(countTotal/beat1);
	let beat2Trig = Math.floor(countTotal/beat2);
	countTotal = Math.round(countTotal);
	count += 1;
	if (place >= end){count = 0;}
	if (count < countTotal - 5){
	if (count%beat1Trig == 0){stick1.play();}
	if (count%beat2Trig == 0){stick2.play();}
}
	pop();
}
else{count=0;}
}