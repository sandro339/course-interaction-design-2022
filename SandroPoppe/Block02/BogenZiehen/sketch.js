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

function setup() {
  w = 800;
  h = 800;
 createCanvas(w, h);
 time = 0;
 mouseLocation = createVector(0,0);
 bogen = new Bogen(createVector(400*scales,400*scales),3);
 ball = new Ball(1,createVector(2,2));
}

function draw() {
  createCanvas(w, h);
  background(200, 200, 230);
  
  bogen.display();
  ball.display();
  if(shot == true){
    ball.dir = createVector(400*scales - ball.pos.x,400*scales -  ball.pos.y);
    ball.dir.x = ball.dir.x / ball.dir.mag();
    ball.dir.y = ball.dir.y / ball.dir.mag();
    ball.speed = map((Math.abs(mouseX-mouseLocation.x)+Math.abs(mouseY-mouseLocation.y))/2,0,600,0,100);
    bogen.speed = map((Math.abs(mouseX-mouseLocation.x)+Math.abs(mouseY-mouseLocation.y))/2,0,600,0,1);
    shot = false;
    time = 100;
    flying = true;
  }else if(flying == true){
    ball.move();
    time -= 1;
    bogen.move();
    if(time <= 0){
      flying = false;
    }
  }
  else{
    bogen.center = createVector(400,400);
    ball.pos = createVector(400,400);
    newscale();
  if(mouseX < bogen.center.x + 20 && mouseX > bogen.center.x - 20 && mouseY < bogen.center.y + 20 && mouseY > bogen.center.y - 20 && grabbed == false && pressed == true){
    grabbed = true;
  }
  if(grabbed == true){
    bogen.center.x += mouseX - mouseLocation.x; 
    bogen.center.y += mouseY - mouseLocation.y; 
    ball.pos.x += mouseX - mouseLocation.x; 
    ball.pos.y += mouseY - mouseLocation.y; 
  }
  }
  scales = windowWidth/1920;
  console.log(scales);
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
  pressed = true;
  mouseLocation = createVector(mouseX,mouseY);
}
function mouseReleased(){
  if(grabbed == true){
    shot = true;
  }
  grabbed = false;
  pressed = false;

}