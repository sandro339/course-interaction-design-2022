// https://p5js.org/examples/input-clock.html


function setup() {

  createCanvas(800, 800);
  angleMode(DEGREES);
  background(0,50,100,100);
  rectMode(CENTER);
  fill(200);
  noStroke();
  rect(400,750,800,100);
  fill(105,84,63);
  quad(0,700,70,650,730,650,800,700);
  quad(100,650,250,400,550,400,700,650);
  quad(275,400,300,350,500,350,525,400);
  fill(196,106,22);
  circle(400,740,110,110);
  stroke(196,106,22);
  strokeWeight(4);
  line(400,700,400,350);
  line(400,600,190,500);
  line(400,300,400,200);
  line(410,300,460,230);
  line(390,300,340,230);
  fill(200,100);
  stroke(50);
  strokeWeight(2);
  rect(250,150,400,200);
  line(150,250,256,360);
  line(256,360,397,400);
  text("Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.", 250,250,300,300);
  rect(730,50,100,50);
  textSize(20);
  text("Pause",700,55);
}

