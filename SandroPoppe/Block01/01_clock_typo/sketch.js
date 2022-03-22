
let customFont;
let seconds, milliseconds, millisecondsPerSecond;

function preload() {
  customFont = loadFont('data/IBM_Plex_Mono/IBMPlexMono-Regular.ttf');
}

function setup() {
  canvas = createCanvas(800, 800).parent('canvas');
  textFont(customFont);
}

function draw() {
  background(0);
  milliseconds = int(millis() % 60000);
  seconds = int(milliseconds / 1000) % 60000;

  var centerX = 0;
  var centerY = 0;
  translate(400,400);
  var gap = 6;        
  var STEPS_PER_ROTATION = 20; 
  var count = 0;
  var increment = 2*Math.PI/STEPS_PER_ROTATION ;		
  var theta = increment;
  while( theta < 20*Math.PI) {
    count++;
    var newX = centerX + theta * Math.cos(theta) * gap; 
    var newY = centerY + theta * Math.sin(theta) * gap; 
    stroke(200);
    if(count > 20 && !((count - seconds)%20 == 0 && count-10 < seconds)){
      if(count-20 == parseInt(seconds))
      {
        strokeWeight(3);
        line(0,0,newX /1.5,newY/1.5);
        strokeWeight(1);
      }
      textSize(count-20 == parseInt(seconds)? (count/1.5) : (count/3.5));
      text(parseInt(count%200)-20,newX,newY);
    }
    theta = theta + 2*Math.PI/STEPS_PER_ROTATION;
  }
  noStroke();
  fill(255);
  textAlign(CENTER, CENTER);
}