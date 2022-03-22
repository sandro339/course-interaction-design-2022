let w = 800;
let h = 800;
let P0, P1;
let startTime, endTime;
let seconds, milliseconds;
let angle = 180;
let time = 0;
let color = 0;

function setup() {

  createCanvas(w, h);
  angleMode(DEGREES);
  background(200);
  strokeWeight(5);
  fill(255, 0, 0);
  stroke(0);
  P0 = createVector(0, 0);
  strich(createVector(800*sin(angle),800*cos(angle)));
  imageMode(CENTER);
  img = loadImage('data/brush2.png');
  image(img,100,100,50,50);
  
}

function draw() {
  translate(400,400);
  time++;
  milliseconds = int(millis() % 60000);
  seconds = milliseconds / 1000;
  stroke(255);
  
  
  let currentTIme = millis();
  let scale = min(1, (currentTIme - startTime) / (endTime - startTime));
  let V_dist = p5.Vector.sub(P1, P0).mult(scale);
  let PX = p5.Vector.add(P0, V_dist);

  stroke(255-color*4,color/90*255,color/120*255);
  strokeWeight(15);
  point(PX.x,PX.y);
  image(img,PX.x,PX.y, 50,50);
  
  
  if(time >= 30)
  {
    time = 0;
    angle-=3;
    color++;
    strich(createVector(800*sin(angle),800*cos(angle)));
  }
  
  

}

function strich(vec){
 
  P1 = vec;
  startTime = millis();
  endTime = startTime +700;
  
}