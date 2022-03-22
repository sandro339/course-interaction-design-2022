// globals
let customFont;
let seconds, milliseconds, millisecondsPerSecond;

// preload
function preload() {
  // load data here
  customFont = loadFont('data/IBM_Plex_Mono/IBMPlexMono-Regular.ttf');
}

// setup
function setup() {

  // init canvas
  canvas = createCanvas(800, 800).parent('canvas');

  // init custom fonts
  textFont(customFont);

}

// draw
function draw() {

  // background
  background(0);

  // get seconds and milliseconds
  milliseconds = int(millis() % 60000);
  seconds = int(milliseconds / 1000) % 60000;
  millisecondsPerSecond = milliseconds % 1000;

  // seconds as two digits and milliseconds as three digitis if used for typo
  let seconds_two_digits = String(seconds).padStart(2, "0");
  let milliseconds_three_digits = String(millisecondsPerSecond).padStart(3, "0");


 
  
        var centerX = 0;
        var centerY = 0;
        translate(400,500);
    
        var gap = 6;        
        var STEPS_PER_ROTATION = 20; 
        var count = 0;
        var increment = 2*Math.PI/STEPS_PER_ROTATION ;		
        var theta = increment;
        var x = 0;
        var y = 0;
        while( theta < 20*Math.PI) {
           count++;
           push();
           var newX = centerX + theta * Math.cos(theta) * gap; 
           var newY = centerY + theta * Math.sin(theta) * gap; 
           stroke(200);
            translate(newX,newY);
           if(count > 20){
             if((count - seconds)%10 == 0 && count-10 < seconds)
             {
              x = newX;
              y = newY;
               
             }else{
               textSize(count-20 == parseInt(seconds)? (count/1.5) : (count/3.5));
              text(parseInt(count%200)-20,0,0);
             }
              pop();
           }
           if(count%10 == 1)
           {
              line(x,y,newX,newY);
           }
           
           theta = theta + 2*Math.PI/STEPS_PER_ROTATION;
           
        }

  noStroke();
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(20);
  text(seconds_two_digits + ":" + milliseconds_three_digits, width / 2, height / 2);

}