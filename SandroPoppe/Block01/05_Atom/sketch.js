let Uran = [];
let Neutronen = [];
let LeftOvers = [];
let energy = 0;
let amount = 0;

function setup() {
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
  for (let i = 0; i < Uran.length; i++) {
    Uran[i].display();
    Uran[i].move();
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
        Neutronen.push(new Neutron(Neutronen[i].x,Neutronen[i].y,random(-1,1),random(-1,1)));
        Neutronen.push(new Neutron(Neutronen[i].x,Neutronen[i].y,random(-1,1),random(-1,1)));
        LeftOvers.push(new Lefties(Neutronen[i].x,Neutronen[i].y,random(-1,1),random(-1,1)));
        LeftOvers.push(new Lefties(Neutronen[i].x,Neutronen[i].y,random(-1,1),random(-1,1)));
        Neutronen.splice(i,1);
        Uran.splice(k,1);
        energy++;
        amount += 175;
      }
    }
  }
  strokeWeight(3);
  fill(50,89,100);
  rect(700,401,80,400);
  fill(0,255,0);
  quad(700,800,780,800,780,800-energy*2,700,800-energy*2);
  fill(255);
  strokeWeight(1);
  text(amount,730,370);
  text("MeV",730,390);
}

// Jitter class
class Atom {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.diameter = 30;
    this.speed = 1;
  }

  move() {
    this.x += random(-this.speed, this.speed);
    this.y += random(-this.speed, this.speed);
  }

  display() {
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}
class Neutron {
  constructor(x,y,dirx,diry) {
    this.x = x;
    this.y = y;
    this.diameter = 5;
    this.speed = 1;
    this.directionx = dirx;
    this.directiony = diry;
  }

  move() {
    this.x += this.directionx;
    this.y += this.directiony;
  }

  display() {
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}
class Lefties {
  constructor(x,y,dirx,diry) {
    this.x = x;
    this.y = y;
    this.diameter = 15;
    this.speed = 1;
    this.directionx = dirx;
    this.directiony = diry;
    this.time = 120;
  }

  move() {
    this.time--;
    this.x += this.directionx;
    this.y += this.directiony;
  }

  display() {
    fill(255,this.time*2);
    ellipse(this.x, this.y, this.diameter, this.diameter);
    fill(255);
  }
}