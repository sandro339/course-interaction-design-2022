// https://p5js.org/examples/input-clock.html

let w = 800
let h = 800;
let seconds, milliseconds;
let angle1 = 1;
let angle2 = 2;
let angle3 = 3;
let angle4 = 1;
let angle5 = 2;
let angle6 = 3;
let angle7 = 1;
let angle8 = 2;
let angle9 = 3;
let angle10 = 1;
let angle11 = 2;

function setup() {

  createCanvas(w, h);
  angleMode(DEGREES);
}

function draw() {

  

  background(200);

  scale(1.5);
  translate(400/1.5, 400/1.5);
  rotate(milliseconds/1000/60*360);
  stroke(255);
  fill(0);
  ellipse(0, 0, 100, 100);
  push();


  translate(50, 0);
  rotate(milliseconds/1000/30*360);
  fill(0);
  ellipse(0, 0, 90, 90);


  translate(45, 0);
  rotate(milliseconds/1000/15*360);
  fill(0);
  ellipse(0, 0, 80, 80);


  translate(40, 0);
  rotate(milliseconds/1000/10*360);
  fill(0);
  ellipse(0, 0, 70, 70);


  translate(35, 0);
  rotate(milliseconds/1000/5*360);
  fill(0);
  ellipse(0, 0, 60, 60);


  translate(30, 0);
  rotate(milliseconds/1000/3*360);
  fill(0);
  ellipse(0, 0, 50, 50);


  translate(25, 0);
  rotate(milliseconds/1000/2*360);
  fill(0);
  ellipse(0, 0, 40, 40);


  translate(20, 0);
  rotate(milliseconds/1000*360);
  fill(0);
  ellipse(0, 0, 30, 30);

  translate(15, 0);
  rotate(milliseconds/1000*2*360);
  fill(0);
  ellipse(0, 0, 20, 20);

  translate(10, 0);
  rotate(angle10);
  fill(0);
  ellipse(0, 0, 10, 10);

  translate(5, 0);
  rotate(angle11);
  fill(0);
  ellipse(0, 0, 5, 5);
  rect(0,0,80,5);

  pop();

  line(0,0,50,0);
  translate(50, 0);
  rotate(milliseconds/1000/30*360);
  line(0,0,45,0);
  


  translate(45, 0);
  rotate(milliseconds/1000/15*360);
  line(0,0,40,0);


  translate(40, 0);
  rotate(milliseconds/1000/10*360);
  line(0,0,35,0);


  translate(35, 0);
  rotate(milliseconds/1000/5*360);
  line(0,0,30,0);


  translate(30, 0);
  rotate(milliseconds/1000/3*360);
  line(0,0,25,0);


  translate(25, 0);
  rotate(milliseconds/1000/2*360);
  line(0,0,20,0);


  translate(20, 0);
  rotate(milliseconds/1000*360);
  line(0,0,15,0);

  translate(15, 0);
  rotate(milliseconds/1000*2*360);
  line(0,0,10,0);

  translate(10, 0);
  rotate(angle10);
  line(0,0,5,0);


  milliseconds = int(millis() % 60000);
  seconds = int(milliseconds / 1000);
  //seconds = milliseconds / 1000;

  

}