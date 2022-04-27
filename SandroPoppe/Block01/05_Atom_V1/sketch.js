let Uran = [];
let Neutronen = [];
let LeftOvers = [];
let explosions = [];
let energy = 0;
let amount = 0;
let uranImage;
let neutronImage;
let leftieImage;
let seconds, millisecondsmillisecondsPerSecond;


function preload(){
  uranImage = loadImage('Img/Uran.png');
  neutronImage = loadImage('Img/Neutron.png');
  leftieImage = loadImage('Img/Lefties.png');
}

function setup() {
  //hi svenja
  imageMode(CENTER);
  createCanvas(800, 800);
  for (let i = 0; i < 60; i++) {
    Uran.push(new Atom( 20 +(i*10)%600,50 +(i*40)%700));
  }
  for (let i = 0; i < 60; i++) {
    Uran.push(new Atom( 60 +(i*10)%600,50 +(i*40)%700));
  }
  for (let i = 0; i < 60; i++) {
    Uran.push(new Atom( 100 +(i*10)%600,50 +(i*40)%700));
  }
  Neutronen.push(new Neutron(700,400,-1,0));
}

function draw() {
  background(50, 89, 100);
  milliseconds = int(millis() % 60000);
  seconds = int(milliseconds / 1000) % 60000;
  millisecondsPerSecond = milliseconds % 1000;
  let seconds_two_digits = String(seconds).padStart(2, "0");
  let milliseconds_three_digits = String(millisecondsPerSecond).padStart(3, "0");
  text(seconds_two_digits + ":" + milliseconds_three_digits, width / 2, height / 2);
  for (let i = 0; i < Uran.length; i++) {
    Uran[i].display();
    Uran[i].move();
    if(Uran[i].hit && Uran[i].time <= 0)
    {
      Neutronen.push(new Neutron(Uran[i].x,Uran[i].y,random(-1,1),random(-1,1)));
        Neutronen.push(new Neutron(Uran[i].x,Uran[i].y,random(-1,1),random(-1,1)));
        LeftOvers.push(new Lefties(Uran[i].x,Uran[i].y,random(-1,1),random(-1,1)));
        LeftOvers.push(new Lefties(Uran[i].x,Uran[i].y,random(-1,1),random(-1,1)));
        explosions.push(new Explosion(Uran[i].x,Uran[i].y));
        Uran.splice(i,1);
        energy++;
        amount += 175;
    }
  }
  for(let i = 0; i< explosions.length;i++)
  {
    explosions[i].display();
    explosions[i].diameter += explosions[i].speed;
    explosions[i].time --;
    if(explosions[i].time <= 0)
    {
      explosions.splice(i,1);
    }
  }
  for (let l = 0; l < LeftOvers.length; l++) {
    LeftOvers[l].display();
    LeftOvers[l].move();
    if(LeftOvers[l].time<= 0) LeftOvers.splice(l,1);
  }
  for (let i = 0; i < Neutronen.length; i++) {
    Neutronen[i].display();
    Neutronen[i].move();
    for (let k = 0; k < Uran.length; k++) {
      if(Neutronen[i].x <= Uran[k].x+15 && Neutronen[i].x >= Uran[k].x -15 && Neutronen[i].y <= Uran[k].y+15 && Neutronen[i].y >= Uran[k].y -15)
      {
        Neutronen.splice(i,1);
        Uran[k].hit = true;
        break;
      }
    }
  }
  strokeWeight(3);
  fill(50,89,100);
  rect(700,401,80,400);
  fill(24, 210, 242);
  quad(700,800,780,800,780,800-energy*2,700,800-energy*2);
  fill(255);
  strokeWeight(1);
  text(amount,730,370);
  text("MeV",730,390);
}

class Explosion{
  constructor(x,y)
  {
    this.x = x;
    this.y = y;
    this.speed = 8;
    this.diameter = 4;
    this.time = 40;
  }
  display(){
    stroke(255,232,124,this.time*4);
    noFill();
    circle(this.x,this.y,this.diameter,this.diameter);
    stroke(0);
  }
}
class Atom {

  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.diameter = 30;
    this.speed = 0;
    this.time = 120;
    this.hit = false;
  }


  move() {
    this.x += random(-this.speed, this.speed);
    this.y += random(-this.speed, this.speed);
  }

  display() {
    if(this.hit){
      this.time --;
      this.speed = 2;
    }
    image(uranImage,this.x, this.y, this.diameter, this.diameter);
    //ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}
class Neutron {
  constructor(x,y,dirx,diry) {
    this.x = x;
    this.y = y;
    this.diameter = 15;
    this.speed = 1;
    this.directionx = dirx;
    this.directiony = diry;
  }

  move() {
    this.x += this.directionx * this.speed;
    this.y += this.directiony * this.speed;
  }

  display() {
    image(neutronImage,this.x, this.y, this.diameter, this.diameter);
  }
}
class Lefties {
  constructor(x,y,dirx,diry) {
    this.x = x;
    this.y = y;
    this.diameter = 25;
    this.speed = 3;
    this.directionx = dirx;
    this.directiony = diry;
    this.time = 120;
  }

  move() {
    this.time--;
    this.x += this.directionx*this.speed;
    this.y += this.directiony*this.speed;
  }

  display() {
    fill(255,this.time*2);
    image(leftieImage,this.x, this.y, this.diameter, this.diameter);
    fill(255);
  }
}