
let canvas;
let w,h;

var customFont;
let Uhr = 0;
let osc;
let scaler = 1;
let scaler2 = 1;

let smaller = false;
let playingHighF = false;
let playingLowF = false;
let playingD= false;
let playingE= false;
let playingC= false;
let playingG= false;
let playingA= false;
let playingB= false;
let playedD= false;
let playedE= false;
let playedLowF= false;
let playedHighF= false;
let playedG= false;
let playedA= false;
let playedB= false;
let playedC= false;
let FingerHighF = null;
let FingerLowF = null;
let FingerA = null;
let FingerB = null;
let FingerC = null;
let FingerD = null;
let FingerE = null;
let FingerG = null;
let blobs = [];

let HighF,LowF,G,A,B,C,D,E;


let sketch = function(p){
  class Blob {
    constructor(speed,pos) {
    this.pos = pos;
    this.speed = speed;
    this.diameter = 5*scaler2;
    }
    display() {
      p.stroke(0);
      p.strokeWeight(20);
      p.fill(0);
      p.rectMode(p.CENTER);
      p.rect(this.pos.x,this.pos.y, this.diameter,this.diameter);
    }
    move() {
      this.pos.y -=this.speed;
    }
  }
  p.preload = function(){
    HighF = p.loadSound('data/key13.mp3');
    LowF = p.loadSound('data/key01.mp3');
    G = p.loadSound('data/key03.mp3');
    A = p.loadSound('data/key05.mp3');
    B = p.loadSound('data/key07.mp3');
    C = p.loadSound('data/key08.mp3');
    D = p.loadSound('data/key10.mp3');
    E = p.loadSound('data/key12.mp3');
  }
  p.setup = function(){
    w = 1000;
    h = 800;
    
    
    canvas = p.createCanvas(w, h, p.WEBGL);
    canvas.id('canvas');
  
    p.stroke(0);
    p.strokeWeight(20);
  }
  p.draw = function(){
    
    p.clear();
    p.push();
    p.scale(-1,1);
    p.translate(-p.width/2,-p.height/2);
    p.stroke(0);
    p.strokeWeight(4*scaler2);
    p.stroke(255,200,2);
    p.fill(0)
    p.rectMode(p.CORNERS);
    p.rect(0*scaler2,800*scaler2,125*scaler2,500*scaler2);
    p.rect(125*scaler2,800*scaler2,250*scaler2,500*scaler2);
    p.rect(250*scaler2,800*scaler2,375*scaler2,500*scaler2);
    p.rect(375*scaler2,800*scaler2,500*scaler2,500*scaler2);
    p.rect(500*scaler2,800*scaler2,625*scaler2,500*scaler2);
    p.rect(625*scaler2,800*scaler2,750*scaler2,500*scaler2);
    p.rect(750*scaler2,800*scaler2,875*scaler2,500*scaler2);
    p.rect(875*scaler2,800*scaler2,1000*scaler2,500*scaler2);
    
    
    if(detections != undefined){
      if(detections.multiHandLandmarks != undefined)
      {
        if(detections.multiHandLandmarks[0] != undefined){
          for(let i=0; i<detections.multiHandLandmarks.length; i++){
            for(let j=4; j<21; j++){
              if(j%4== 0){
                if(playedHighF == false && detections.multiHandLandmarks[i][j].x*p.width < 125 *scaler2 && detections.multiHandLandmarks[i][j].x*p.width > 0*scaler2&&detections.multiHandLandmarks[i][j].y*p.height < 800 *scaler2 && detections.multiHandLandmarks[i][j].y*p.height > 500*scaler2){
                  playingHighF = true;
                  FingerHighF = i*20+j;
                  blobs.push(new Blob(10,p.createVector(62.5*scaler2,500*scaler2)));
                }
                if(FingerHighF == i*20+j&&!(detections.multiHandLandmarks[i][j].x*p.width < 125 *scaler2 && detections.multiHandLandmarks[i][j].x*p.width > 0*scaler2&&detections.multiHandLandmarks[i][j].y*p.height < 800 *scaler2 && detections.multiHandLandmarks[i][j].y*p.height > 500*scaler2)){
                  playedHighF = false;
                  console.log("played");
                }
                if(playedE == false &&detections.multiHandLandmarks[i][j].x*p.width < 250 *scaler2 && detections.multiHandLandmarks[i][j].x*p.width > 125*scaler2&&detections.multiHandLandmarks[i][j].y*p.height < 800 *scaler2 && detections.multiHandLandmarks[i][j].y*p.height > 500*scaler2){
                  playingE = true;
                  FingerE = i*20+j;
                  blobs.push(new Blob(10,p.createVector(187.5*scaler2,500*scaler2)));
                }
                if(FingerE == i*20+j&&!(detections.multiHandLandmarks[i][j].x*p.width < 250 *scaler2 && detections.multiHandLandmarks[i][j].x*p.width > 125*scaler2&&detections.multiHandLandmarks[i][j].y*p.height < 800 *scaler2 && detections.multiHandLandmarks[i][j].y*p.height > 500*scaler2)){
                  playedE = false;
                  console.log("played");
                }
                if(playedD == false &&detections.multiHandLandmarks[i][j].x*p.width < 375 *scaler2 && detections.multiHandLandmarks[i][j].x*p.width > 250*scaler2&&detections.multiHandLandmarks[i][j].y*p.height < 800 *scaler2 && detections.multiHandLandmarks[i][j].y*p.height > 500*scaler2){
                  playingD = true;
                  FingerD = i*20+j;
                  blobs.push(new Blob(10,p.createVector(312.5*scaler2,500*scaler2)));
                }
                if(FingerD == i*20+j&&!(detections.multiHandLandmarks[i][j].x*p.width < 375 *scaler2 && detections.multiHandLandmarks[i][j].x*p.width > 250*scaler2&&detections.multiHandLandmarks[i][j].y*p.height < 800 *scaler2 && detections.multiHandLandmarks[i][j].y*p.height > 500*scaler2)){
                  playedD = false;
                  console.log("played");
                }
                if(playedC == false &&detections.multiHandLandmarks[i][j].x*p.width < 500 *scaler2 && detections.multiHandLandmarks[i][j].x*p.width > 375*scaler2&&detections.multiHandLandmarks[i][j].y*p.height < 800 *scaler2 && detections.multiHandLandmarks[i][j].y*p.height > 500*scaler2){
                  playingC = true;
                  FingerC = i*20+j;
                  blobs.push(new Blob(10,p.createVector(437.5*scaler2,500*scaler2)));
                }
                if(FingerC == i*20+j&&!(detections.multiHandLandmarks[i][j].x*p.width < 500 *scaler2 && detections.multiHandLandmarks[i][j].x*p.width > 375*scaler2&&detections.multiHandLandmarks[i][j].y*p.height < 800 *scaler2 && detections.multiHandLandmarks[i][j].y*p.height > 500*scaler2)){
                  playedC = false;
                  console.log("played");
                }
                if(playedB == false &&detections.multiHandLandmarks[i][j].x*p.width < 625 *scaler2 && detections.multiHandLandmarks[i][j].x*p.width > 500*scaler2&&detections.multiHandLandmarks[i][j].y*p.height < 800 *scaler2 && detections.multiHandLandmarks[i][j].y*p.height > 500*scaler2){
                  playingB = true;
                  FingerB = i*20+j;
                  blobs.push(new Blob(10,p.createVector(562.5*scaler2,500*scaler2)));
                }
                if(FingerB == i*20+j&&!(detections.multiHandLandmarks[i][j].x*p.width < 625 *scaler2 && detections.multiHandLandmarks[i][j].x*p.width > 500*scaler2&&detections.multiHandLandmarks[i][j].y*p.height < 800 *scaler2 && detections.multiHandLandmarks[i][j].y*p.height > 500*scaler2)){
                  playedB = false;
                  console.log("played");
                }
                if(playedA == false &&detections.multiHandLandmarks[i][j].x*p.width < 750 *scaler2 && detections.multiHandLandmarks[i][j].x*p.width > 625*scaler2&&detections.multiHandLandmarks[i][j].y*p.height < 800 *scaler2 && detections.multiHandLandmarks[i][j].y*p.height > 500*scaler2){
                  playingA = true;
                  FingerA = i*20+j;
                  blobs.push(new Blob(10,p.createVector(687.5*scaler2,500*scaler2)));
                }
                if(FingerA == i*20+j&&!(detections.multiHandLandmarks[i][j].x*p.width < 750 *scaler2 && detections.multiHandLandmarks[i][j].x*p.width > 625*scaler2&&detections.multiHandLandmarks[i][j].y*p.height < 800 *scaler2 && detections.multiHandLandmarks[i][j].y*p.height > 500*scaler2)){
                  playedA = false;
                  console.log("played");
                }
                if(playedG == false &&detections.multiHandLandmarks[i][j].x*p.width < 825 *scaler2 && detections.multiHandLandmarks[i][j].x*p.width > 750*scaler2&&detections.multiHandLandmarks[i][j].y*p.height < 800 *scaler2 && detections.multiHandLandmarks[i][j].y*p.height > 500*scaler2){
                  playingG = true;
                  FingerG = i*20+j;
                  blobs.push(new Blob(10,p.createVector(812.5*scaler2,500*scaler2)));
                }
                if(FingerG == i*20+j&&!(detections.multiHandLandmarks[i][j].x*p.width < 825 *scaler2 && detections.multiHandLandmarks[i][j].x*p.width > 750*scaler2&&detections.multiHandLandmarks[i][j].y*p.height < 800 *scaler2 && detections.multiHandLandmarks[i][j].y*p.height > 500*scaler2)){
                  playedG = false;
                  console.log("played");
                }
                if(playedLowF == false &&detections.multiHandLandmarks[i][j].x*p.width < 1000 *scaler2 && detections.multiHandLandmarks[i][j].x*p.width > 825*scaler2&&detections.multiHandLandmarks[i][j].y*p.height < 800 *scaler2 && detections.multiHandLandmarks[i][j].y*p.height > 500*scaler2){
                  playingLowF = true;
                  FingerLowF = i*20+j;
                  blobs.push(new Blob(10,p.createVector(937.5*scaler2,500*scaler2)));
                }
                if(FingerLowF == i*20+j&&!(detections.multiHandLandmarks[i][j].x*p.width < 1000 *scaler2 && detections.multiHandLandmarks[i][j].x*p.width > 825*scaler2&&detections.multiHandLandmarks[i][j].y*p.height < 800 *scaler2 && detections.multiHandLandmarks[i][j].y*p.height > 500*scaler2)){
                  playedLowF = false;
                  console.log("played");
                }
              }
            }
          }
        }
        p.drawHands();
        p.drawLines([0, 5, 9, 13, 17, 0]);//palm
          p.drawLines([0, 1, 2, 3 ,4]);//thumb
          p.drawLines([5, 6, 7, 8]);//index finger
          p.drawLines([9, 10, 11, 12]);//middle finger
          p.drawLines([13, 14, 15, 16]);//ring finger
          p.drawLines([17, 18, 19, 20]);//pinky
      }
    }
    for(let i = 0;i < blobs.length; i++){
      blobs[i].display();
      blobs[i].move();
    }
    if(playingHighF == true){
      HighF.play();
      playingHighF = false;
      playedHighF = true;
    }
    if(playingLowF ==true){
      LowF.play();
      playedLowF = true;
      playingLowF = false;
    }
    if(playingD ==true){
      D.play();
      playedD = true;
      playingD= false;
    }
    if(playingE ==true){
      E.play();
      playedE = true;
      playingE = false;
    }
    if(playingC ==true){
      C.play();
      playedC = true;
      playingC = false;
    }
    if(playingG ==true){
      G.play();
      playedG = true;
      playingG = false;
    }
    if(playingA ==true){
      A.play();
      playedA = true;
      playingA = false;
    }
    if(playingB ==true){
      B.play();
      playedB = true;
      playingB = false;
    }
 
    scaler2 = p.windowWidth/1000;
  

    if(p.windowWidth > 1000){
      scaler2 = 1;
    }
   
   
    if(Uhr % 2 == 0&& Uhr != 0){
      p.pop();
      p.stroke(0);
      p.textSize(40);
      p.text(0);
      p.fill(0);
      p.textAlign(p.CENTER);
      p.translate(-p.width/2,-p.height/2);
      p.text("Tack", w/2, 200);
    }else if(Uhr != 0){
      p.pop();
      p.stroke(0);
      p.textSize(40);
      p.text(0);
      p.fill(0);
      p.textAlign(p.CENTER);
      p.translate(-p.width/2,-p.height/2);
      p.text("Tick", w/2, 200);
    }

    scaler = p.windowWidth/w;
    
    if(p.windowWidth <= 1000){
      w *= scaler;
      h *= scaler;
      p.resizeCanvas(w-10,h-10);
      smaller = true;
      document.getElementById('canvas').style.marginLeft = -w/2+5 + "px";
    }
    if(p.windowWidth > 1000){
      scaler2 = 1;
      document.getElementById('canvas').style.marginLeft = -w/2+5 + "px";
    }
    
    if(smaller == true && p.windowWidth > 1000)
    {
      w = 1000;
      h = 800;
      console.log("reset")
      scaler = 1;
      p.resizeCanvas(w,h);
    }
  }
  p.drawLines = function(index){
    p.stroke(0, 0, 255);
    p.strokeWeight(3);
    for(let i=0; i<detections.multiHandLandmarks.length; i++){
      for(let j=0; j<index.length-1; j++){
        let x = detections.multiHandLandmarks[i][index[j]].x * p.width;
        let y = detections.multiHandLandmarks[i][index[j]].y * p.height;
        // let z = detections.multiHandLandmarks[i][index[j]].z;

        let _x = detections.multiHandLandmarks[i][index[j+1]].x * p.width;
        let _y = detections.multiHandLandmarks[i][index[j+1]].y * p.height;
        // let _z = detections.multiHandLandmarks[i][index[j+1]].z;
        p.line(x, y, _x, _y);
      }
    }
  }
  p.drawHands = function(){
    p.stroke(0);
    p.strokeWeight(10);
    for(let i = 0;i< detections.multiHandLandmarks.length;i++){
      for(let j = 0; j < detections.multiHandLandmarks[i].length;j++)
      {
        p.stroke(0);
        let x = detections.multiHandLandmarks[i][j].x *p.width;
        let y = detections.multiHandLandmarks[i][j].y *p.height;
        let z = detections.multiHandLandmarks[i][j].z;
        p.point(x,y,z);
      }
    }
  }
}

let myp5 = new p5(sketch);