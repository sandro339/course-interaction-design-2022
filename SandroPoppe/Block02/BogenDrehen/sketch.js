let mouseLocation;
let grabbed = false;
let pressed = false;
var bogen;
var ball;
let shot = false;
let flying = false;
let time;
let scales = 1;
let w,h;
let pushed = false;
let power = 0;
let seconds = 600;
let linex,liney;
let angle = 290;

function setup() {
  w = 800;
  h = 800;
 createCanvas(w, h);
 time = 0;
 linex = 100*sin(2000);
 liney = 100*cos(2000);
 mouseLocation = createVector(0,0);
 bogen = new Bogen(createVector(400*scales,400*scales),3);
 ball = new Ball(1,createVector(2,2));
}

function draw() {
  
  createCanvas(w, h);
  background(200, 200, 230);
  linex = 100*sin(angle);
  liney = 100*cos(angle);
  fill(255);
  
  textAlign(CENTER, CENTER);
  textSize(24*scales);
  strokeWeight(10);
  line(600,200,600+linex,200+liney);
  fill(0);
  strokeWeight(1);
  textSize(30*scales);
  text("Hold", 600*scales, 200*scales);
  bogen.display();
  ball.display();
  if(pushed){
    seconds--;
  }
  if(seconds<= 0 && flying == false)
  {
    shot = true;
    pushed = false;
  }
  if(shot == true){
    ball.dir = createVector(400*scales - ball.pos.x,400*scales -  ball.pos.y);
    ball.dir.x = ball.dir.x / ball.dir.mag();
    ball.dir.y = ball.dir.y / ball.dir.mag();
    ball.speed = map(Math.abs(ball.pos.y-400*scales),0,600,0,100);
    bogen.speed = map(Math.abs(bogen.center.y-400*scales),0,600,0,1);
    shot = false;
    time = 100;
    flying = true;
  }else if(flying == true){
    console.log("flying");
    console.log(ball.dir);
    console.log(ball.speed);
    console.log(ball.pos.y);
    ball.move();
    time -= 1;
    bogen.move();
    if(time <= 0){
      flying = false;
      seconds = 600;
      power=0;
    }
  }
  else{
    bogen.center = createVector(400,400);
    ball.pos = createVector(400,400);
    newscale();
    bogen.center.y = 400*scales+ power; 
    ball.pos.y = 400*scales+power;
  if(grabbed == true){
    angle +=0.01;
    power ++;
  }
  }
  scales = windowWidth/1920;
  w = 800 *scales;
  h = 800 *scales;
  
  

}
function newscale(){
  bogen.left.x = 0 * scales;
  bogen.left.y = 400 * scales;
  bogen.right.x = 800 * scales;
  bogen.right.y = 400 * scales;
  bogen.center.x = 400 *scales;
  bogen.center.y = 400*scales;
  ball.pos.x =400*scales;
  ball.pos.y=400*scales;
 
  
}
class Bogen {
  constructor(center,speed) {
    this.left = createVector(0,400);
    this.right = createVector(800,400);
    this.strength = 5;
    this.center = center;
    this.speed = speed;
  }
  move() {
    let dir = createVector(400*scales - this.center.x, 400*scales -  this.center.y);
    this.center.x += dir.x * this.speed;
    this.center.y += dir.y * this.speed;
  }
  display() {
    stroke(0);
    strokeWeight(this.strength)
    line(this.left.x,this.left.y,this.center.x,this.center.y);
    line(this.right.x,this.right.y,this.center.x,this.center.y);
  }
}
class Ball {
  constructor(speed,dir) {
  this.pos = createVector(400,400);
  this.speed = speed;
  this.dir = dir;
  this.diameter = 5;
  }
  display() {
    stroke(0);
    strokeWeight(20);
    fill(0);
    circle(this.pos.x,this.pos.y, this.diameter);
  }
  move() {
    this.pos.x += this.dir.x*this.speed;
    this.pos.y += this.dir.y*this.speed;
  }
}
function mousePressed() {
  if(mouseX<650*scales&& mouseX > 550*scales&&mouseY <250*scales&&mouseY > 150*scales)
  {
    if(flying == false)
    {
          grabbed = true;
    }

    console.log(power);
  }
}
function mouseReleased(){
  if(grabbed == true){
    shot = true;
  }
  grabbed = false;
  pressed = false;

}