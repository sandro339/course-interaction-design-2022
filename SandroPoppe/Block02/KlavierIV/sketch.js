
let canvas;
let w,h;

let customFont;
let Uhr = 0;
let osc;
let scaler = 1;
let scaler2 = 1;
let lifes = 5;
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
let time=0;
let blobs = [];
let notes = [];
let score = 0;
let HighF,LowF,G,A,B,C,D,E;
let notepic,notered,notegreen;
let missednotes = 0;
let Tast = [];
let Tasten = [];



let sketch = function(p){
  class Note {
    constructor(pos,timer,note){
      this.pos = pos;
      this.timer = timer;
      this.displayy = false;
      this.diameter = 70;
      this.note = note;
      this.played = false;
    }
    display() {
      imageMode(CENTER);
      noStroke();
      fill(255);
      quad(this.pos.x*scaler2-20,800*scaler2,this.pos.x*scaler2+20,800*scaler2,this.pos.x*scaler2+20,this.pos.y*scaler2,this.pos.x*scaler2-20,this.pos.y*scaler2);

     }
    move() {
      this.pos.y -=3;
    }
  }
  class Blob {
    constructor(speed,pos,color) {
    this.pos = pos;
    this.speed = speed;
    this.diameter = 70*scaler2;
    this.color = color;
    this.time = 120;
    }
    display() {
      this.time--
      stroke(0);
      strokeWeight(2);
      if(this.color == true)
      {
        image(notegreen, this.pos.x*scaler2,this.pos.y*scaler2,this.diameter*scaler2,this.diameter*scaler2);
      }
      else{
        image(notered, this.pos.x*scaler2,this.pos.y*scaler2,this.diameter*scaler2,this.diameter*scaler2);
      }
      
    }
    move() {
      this.pos.y -=this.speed;
    }
  }
  preload = function(){
    customFont = loadFont('Data/IBM_Plex_Mono/IBMPlexMono-Regular.ttf');
    console.log(customFont);
    notepic = loadImage('Data/note.png');
    notered = loadImage('Data/notered.png');
    
    notegreen = loadImage('Data/notegreen.png');
    HighF = loadSound('data/key13.mp3');
    LowF = loadSound('data/key08.mp3');
    G = loadSound('data/key10.mp3');
    A = loadSound('data/key12.mp3');
    B = loadSound('data/key13.mp3');
    C = loadSound('data/key15.mp3');
    D = loadSound('data/key17.mp3');
    E = loadSound('data/key19.mp3');
  }
  setup = function(){
    w = 1000;
    h = 800;
    for(let i = 0; i < 8;i++){
      Tast.push(500);
    }
    for(let i = 0; i < 8;i++){
      Tasten.push(false);
    }
    
    textFont(customFont);
    console.log(textFont());
    canvas = createCanvas(w, h, WEBGL);
    canvas.id('canvas');
    notes.push(new Note(createVector(312.5,800),390,"D"));
    notes.push(new Note(createVector(437.5,800),320,"C"));
    notes.push(new Note(createVector(562.5,800),290,"B"));
    notes.push(new Note(createVector(687.5,800),260,"A"));
    notes.push(new Note(createVector(812.5,800),230,"G"));
    notes.push(new Note(createVector(937.5,800),200,"LowF"));
    notes.push(new Note(createVector(437.5,800),360,"C"));
    notes.push(new Note(createVector(312.5,800),420,"D"));
    notes.push(new Note(createVector(312.5,800),450,"D"));
    notes.push(new Note(createVector(312.5,800),480,"D"));
    notes.push(new Note(createVector(437.5,800),510,"C"));
    notes.push(new Note(createVector(312.5,800),540,"D"));
    notes.push(new Note(createVector(312.5,800),570,"D"));
    notes.push(new Note(createVector(312.5,800),600,"D"));
    notes.push(new Note(createVector(312.5,800),630,"D"));
    notes.push(new Note(createVector(437.5,800),660,"C"));
    notes.push(new Note(createVector(562.5,800),690,"B"));
    notes.push(new Note(createVector(562.5,800),720,"B"));
    notes.push(new Note(createVector(562.5,800),750,"B"));
    notes.push(new Note(createVector(562.5,800),780,"B"));
    notes.push(new Note(createVector(687.5,800),810,"A"));
    notes.push(new Note(createVector(687.5,800),840,"A"));
    notes.push(new Note(createVector(437.5,800),870,"C"));
    notes.push(new Note(createVector(437.5,800),900,"C"));
    notes.push(new Note(createVector(437.5,800),930,"C"));
    notes.push(new Note(createVector(437.5,800),960,"C"));
    notes.push(new Note(createVector(937.5,800),990,"LowF"));

    stroke(0);
    strokeWeight(20);
  }
  draw = function(){
    clear();
    
    textSize(60);
    fill(0);
    textAlign(CENTER);
    translate(-width/2,-height/2);
    text(score, w/2, 200*scaler2);
    translate(width/2,height/2);
    scale(-1,1);
    translate(-width/2,-height/2);
    stroke(0);
    strokeWeight(7*scaler2);
    stroke(255);
    fill(0)
    rectMode(CORNERS);
    rect(0*scaler2,800*scaler2,125*scaler2,Tast[0]*scaler2);
    rect(125*scaler2,800*scaler2,250*scaler2,Tast[1]*scaler2);
    rect(250*scaler2,800*scaler2,375*scaler2,Tast[2]*scaler2);
    rect(375*scaler2,800*scaler2,500*scaler2,Tast[3]*scaler2);
    rect(500*scaler2,800*scaler2,625*scaler2,Tast[4]*scaler2);
    rect(625*scaler2,800*scaler2,750*scaler2,Tast[5]*scaler2);
    rect(750*scaler2,800*scaler2,875*scaler2,Tast[6]*scaler2);
    rect(875*scaler2,800*scaler2,1000*scaler2,Tast[7]*scaler2);
    line(0,550*scaler2,1000*scaler2,550*scaler2);
    
  
    time++;
    if(time % 1100 == 0){
      notes.push(new Note(createVector(312.5,800),time+390,"D"));
    notes.push(new Note(createVector(437.5,800),time+320,"C"));
    notes.push(new Note(createVector(562.5,800),time+290,"B"));
    notes.push(new Note(createVector(687.5,800),time+260,"A"));
    notes.push(new Note(createVector(812.5,800),time+230,"G"));
    notes.push(new Note(createVector(937.5,800),time+200,"LowF"));
    notes.push(new Note(createVector(437.5,800),time+360,"C"));
    notes.push(new Note(createVector(312.5,800),time+420,"D"));
    notes.push(new Note(createVector(312.5,800),time+450,"D"));
    notes.push(new Note(createVector(312.5,800),time+480,"D"));
    notes.push(new Note(createVector(437.5,800),time+510,"C"));
    notes.push(new Note(createVector(312.5,800),time+540,"D"));
    notes.push(new Note(createVector(312.5,800),time+570,"D"));
    notes.push(new Note(createVector(312.5,800),time+600,"D"));
    notes.push(new Note(createVector(312.5,800),time+630,"D"));
    notes.push(new Note(createVector(437.5,800),time+660,"C"));
    notes.push(new Note(createVector(562.5,800),time+690,"B"));
    notes.push(new Note(createVector(562.5,800),time+720,"B"));
    notes.push(new Note(createVector(562.5,800),time+750,"B"));
    notes.push(new Note(createVector(562.5,800),time+780,"B"));
    notes.push(new Note(createVector(687.5,800),time+810,"A"));
    notes.push(new Note(createVector(687.5,800),time+840,"A"));
    notes.push(new Note(createVector(437.5,800),time+870,"C"));
    notes.push(new Note(createVector(437.5,800),time+900,"C"));
    notes.push(new Note(createVector(437.5,800),time+930,"C"));
    notes.push(new Note(createVector(437.5,800),time+960,"C"));
    notes.push(new Note(createVector(937.5,800),time+990,"LowF"));
    }


    if(detections != undefined){
      if(detections.multiHandLandmarks != undefined)
      {
        if(detections.multiHandLandmarks[0] != undefined){
          for(let i=0; i<detections.multiHandLandmarks.length; i++){
            for(let j=8; j<21; j++){
              if(j%4== 0){
                if(playedHighF == false && detections.multiHandLandmarks[i][j].x*width < 125 *scaler2 && detections.multiHandLandmarks[i][j].x*width > 0*scaler2&&detections.multiHandLandmarks[i][j].y*height < 800 *scaler2 && detections.multiHandLandmarks[i][j].y*height > 500*scaler2){
                  playingHighF = true;
                  FingerHighF = i*20+j;
                  let color = false;
                  Tasten[0] = true;
                  for(let i = 0;i< notes.length;i++){
                    if(notes[i].note=="HighF"){
                      if(notes[i].timer<time-80&&notes[i].timer> time-100){
                        if(notes[i].played == false){
                            score++;
                            color = true;
                            notes[i].played = true;
                        }
                      }
                    }
                  }
                  blobs.push(new Blob(10,createVector(62.5*scaler2,500*scaler2),color));
                }
                if(FingerHighF == i*20+j&&!(detections.multiHandLandmarks[i][j].x*width < 125 *scaler2 && detections.multiHandLandmarks[i][j].x*width > 0*scaler2&&detections.multiHandLandmarks[i][j].y*height < 800 *scaler2 && detections.multiHandLandmarks[i][j].y*height > 500*scaler2)){
                  playedHighF = false;
                }
                if(playedE == false &&detections.multiHandLandmarks[i][j].x*width < 250 *scaler2 && detections.multiHandLandmarks[i][j].x*width > 125*scaler2&&detections.multiHandLandmarks[i][j].y*height < 800 *scaler2 && detections.multiHandLandmarks[i][j].y*height > 500*scaler2){
                  playingE = true;
                  FingerE = i*20+j;
                  let color = false;
                  Tasten[1] = true;
                  for(let i = 0;i< notes.length;i++){
                    if(notes[i].note=="E"){
                      if(notes[i].timer<time-80&&notes[i].timer> time-100){
                        if(notes[i].played == false){
                            score++;
                            color = true;
                            notes[i].played = true;
                        }
                      }
                    }
                  }
                  blobs.push(new Blob(10,createVector(187.5*scaler2,500*scaler2),color));
                }
                if(FingerE == i*20+j&&!(detections.multiHandLandmarks[i][j].x*width < 250 *scaler2 && detections.multiHandLandmarks[i][j].x*width > 125*scaler2&&detections.multiHandLandmarks[i][j].y*height < 800 *scaler2 && detections.multiHandLandmarks[i][j].y*height > 500*scaler2)){
                  playedE = false;

                }
                if(playedD == false &&detections.multiHandLandmarks[i][j].x*width < 375 *scaler2 && detections.multiHandLandmarks[i][j].x*width > 250*scaler2&&detections.multiHandLandmarks[i][j].y*height < 800 *scaler2 && detections.multiHandLandmarks[i][j].y*height > 500*scaler2){
                  playingD = true;
                  FingerD = i*20+j;
                  let color = false;
                  Tasten[2] = true;
                  for(let i = 0;i< notes.length;i++){
                    if(notes[i].note=="D"){
                      if(notes[i].timer<time-80&&notes[i].timer> time-100){
                        if(notes[i].played == false){
                            score++;
                            color = true;
                            notes[i].played = true;
                        }
                      }
                    }
                  }
                  blobs.push(new Blob(10,createVector(312.5*scaler2,500*scaler2),color));
                }
                if(FingerD == i*20+j&&!(detections.multiHandLandmarks[i][j].x*width < 375 *scaler2 && detections.multiHandLandmarks[i][j].x*width > 250*scaler2&&detections.multiHandLandmarks[i][j].y*height < 800 *scaler2 && detections.multiHandLandmarks[i][j].y*height > 500*scaler2)){
                  playedD = false;

                }
                if(playedC == false &&detections.multiHandLandmarks[i][j].x*width < 500 *scaler2 && detections.multiHandLandmarks[i][j].x*width > 375*scaler2&&detections.multiHandLandmarks[i][j].y*height < 800 *scaler2 && detections.multiHandLandmarks[i][j].y*height > 500*scaler2){
                  playingC = true;
                  FingerC = i*20+j;
                  let color = false;
                  Tasten[3] = true;
                  for(let i = 0;i< notes.length;i++){
                    if(notes[i].note=="C"){
                      if(notes[i].timer<time-80&&notes[i].timer> time-100){
                        if(notes[i].played == false){
                            score++;
                            color = true;
                            notes[i].played = true;
                        }
                      }
                    }
                  }
                  blobs.push(new Blob(10,createVector(437.5*scaler2,500*scaler2),color));
                }
                if(FingerC == i*20+j&&!(detections.multiHandLandmarks[i][j].x*width < 500 *scaler2 && detections.multiHandLandmarks[i][j].x*width > 375*scaler2&&detections.multiHandLandmarks[i][j].y*height < 800 *scaler2 && detections.multiHandLandmarks[i][j].y*height > 500*scaler2)){
                  playedC = false;

                }
                if(playedB == false &&detections.multiHandLandmarks[i][j].x*width < 625 *scaler2 && detections.multiHandLandmarks[i][j].x*width > 500*scaler2&&detections.multiHandLandmarks[i][j].y*height < 800 *scaler2 && detections.multiHandLandmarks[i][j].y*height > 500*scaler2){
                  playingB = true;
                  FingerB = i*20+j;
                  let color = false;
                  Tasten[4] = true;
                  for(let i = 0;i< notes.length;i++){
                    if(notes[i].note=="B"){
                      if(notes[i].timer<time-80&&notes[i].timer> time-100){
                        if(notes[i].played == false){
                            score++;
                            color = true;
                            notes[i].played = true;
                        }
                      }
                    }
                  }
                  blobs.push(new Blob(10,createVector(562.5*scaler2,500*scaler2),color));
                }
                if(FingerB == i*20+j&&!(detections.multiHandLandmarks[i][j].x*width < 625 *scaler2 && detections.multiHandLandmarks[i][j].x*width > 500*scaler2&&detections.multiHandLandmarks[i][j].y*height < 800 *scaler2 && detections.multiHandLandmarks[i][j].y*height > 500*scaler2)){
                  playedB = false;

                }
                if(playedA == false &&detections.multiHandLandmarks[i][j].x*width < 750 *scaler2 && detections.multiHandLandmarks[i][j].x*width > 625*scaler2&&detections.multiHandLandmarks[i][j].y*height < 800 *scaler2 && detections.multiHandLandmarks[i][j].y*height > 500*scaler2){
                  playingA = true;
                  FingerA = i*20+j;
                  let color = false;
                  Tasten[5] = true;
                  for(let i = 0;i< notes.length;i++){
                    if(notes[i].note=="A"){
                      if(notes[i].timer<time-80&&notes[i].timer> time-100){
                        if(notes[i].played == false){
                            score++;
                            color = true;
                            notes[i].played = true;
                        }
                      }
                    }
                  }
                  blobs.push(new Blob(10,createVector(687.5*scaler2,500*scaler2),color));
                }
                if(FingerA == i*20+j&&!(detections.multiHandLandmarks[i][j].x*width < 750 *scaler2 && detections.multiHandLandmarks[i][j].x*width > 625*scaler2&&detections.multiHandLandmarks[i][j].y*height < 800 *scaler2 && detections.multiHandLandmarks[i][j].y*height > 500*scaler2)){
                  playedA = false;

                }
                if(playedG == false &&detections.multiHandLandmarks[i][j].x*width < 825 *scaler2 && detections.multiHandLandmarks[i][j].x*width > 750*scaler2&&detections.multiHandLandmarks[i][j].y*height < 800 *scaler2 && detections.multiHandLandmarks[i][j].y*height > 500*scaler2){
                  playingG = true;
                  FingerG = i*20+j;
                  let color = false;
                  Tasten[6] = true;
                  for(let i = 0;i< notes.length;i++){
                    if(notes[i].note=="G"){
                      if(notes[i].timer<time-80&&notes[i].timer> time-100){
                        if(notes[i].played == false){
                            score++;
                            color = true;
                            notes[i].played = true;
                        }
                      }
                    }
                  }
                  blobs.push(new Blob(10,createVector(812.5*scaler2,500*scaler2),color));
                }
                if(FingerG == i*20+j&&!(detections.multiHandLandmarks[i][j].x*width < 825 *scaler2 && detections.multiHandLandmarks[i][j].x*width > 750*scaler2&&detections.multiHandLandmarks[i][j].y*height < 800 *scaler2 && detections.multiHandLandmarks[i][j].y*height > 500*scaler2)){
                  playedG = false;

                }
                if(playedLowF == false &&detections.multiHandLandmarks[i][j].x*width < 1000 *scaler2 && detections.multiHandLandmarks[i][j].x*width > 825*scaler2&&detections.multiHandLandmarks[i][j].y*height < 800 *scaler2 && detections.multiHandLandmarks[i][j].y*height > 500*scaler2){
                  playingLowF = true;
                  FingerLowF = i*20+j;
                  let color = false;
                  Tasten[7] = true;
                  console.log("happen");
                  for(let i = 0;i< notes.length;i++){
                    if(notes[i].note=="LowF"){
                      if(notes[i].timer<time-80&&notes[i].timer> time-100){
                        if(notes[i].played == false){
                          score++;
                          color = true;
                          notes[i].played = true;
                        }
                      }
                    }
                  }
                  blobs.push(new Blob(10,createVector(937.5*scaler2,500*scaler2),color));
                }
                if(FingerLowF == i*20+j&&!(detections.multiHandLandmarks[i][j].x*width < 1000 *scaler2 && detections.multiHandLandmarks[i][j].x*width > 825*scaler2&&detections.multiHandLandmarks[i][j].y*height < 800 *scaler2 && detections.multiHandLandmarks[i][j].y*height > 500*scaler2)){
                  playedLowF = false;

                }
              }
            }
          }
        }
        drawHands();
      
      }
    }
    for(let i = 0; i< Tast.length;i++){
      if(Tasten[i]== true){
        Tast[i]+= 8;
      }
      if(Tast[i] >=550){
        Tasten[i] = false;
      }
      if(Tasten[i]== false && Tast[i] > 500){
        Tast[i] -= 6;
      }
      if(Tast[i] < 500) Tast[i] = 500;
    }
    for(let i = 0; i< notes.length;i++){
      if(notes[i].timer == time){
        notes[i].displayy = true;
        console.log("vis");
      }
      if(notes[i].timer <= time -100){
        notes[i].displayy = false;
        if(notes[i].played == false){
          score -=2;
          console.log("missed");
          notes[i].played = true;
        }
       // notes.splice(i,1);
      }if(notes[i].displayy == true){
        notes[i].move();
        notes[i].display();
      }
    }
    for(let i = 0;i < blobs.length; i++){
      if(blobs[i].time >0){
        blobs[i].display();
        blobs[i].move();
      }
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

    scaler2 = windowWidth/1000;
    
    if(windowWidth > 1000){
      scaler2 = 1;
    }
      scale(-1,1);
      textFont(customFont);
      textSize(60);
      fill(0);
      textAlign(CENTER);
      translate(width/2,height/2);
      text(score, w/2, 200*scaler2);
     



    scaler = windowWidth/w;

    if(windowWidth <= 1000){
      w *= scaler;
      h *= scaler;
      resizeCanvas(w-10,h-10);
      smaller = true;
      document.getElementById('canvas').style.marginLeft = -w/2+5 + "px";
    }
    if(windowWidth > 1000){
      scaler2 = 1;
      document.getElementById('canvas').style.marginLeft = -w/2+5 + "px";
    }

    if(smaller == true && windowWidth > 1000)
    {
      w = 1000;
      h = 800;

      scaler = 1;
      resizeCanvas(w,h);
    }
  }
  drawLines = function(index){
    stroke(0, 0, 255);
    strokeWeight(3);
    for(let i=0; i<detections.multiHandLandmarks.length; i++){
      for(let j=0; j<index.length-1; j++){
        let x = detections.multiHandLandmarks[i][index[j]].x * width;
        let y = detections.multiHandLandmarks[i][index[j]].y * height;
        // let z = detections.multiHandLandmarks[i][index[j]].z;

        let _x = detections.multiHandLandmarks[i][index[j+1]].x * width;
        let _y = detections.multiHandLandmarks[i][index[j+1]].y * height;
        // let _z = detections.multiHandLandmarks[i][index[j+1]].z;
        line(x, y, _x, _y);
      }
    }
  }
  drawHands = function(){
    stroke(0);
    strokeWeight(10);
    for(let i = 0;i< detections.multiHandLandmarks.length;i++){
      for(let j = 8; j < 21;j++)
      {
        if(j%4 == 0){
          stroke(0,0,200);
          
        let x = detections.multiHandLandmarks[i][j].x *width;
        let y = detections.multiHandLandmarks[i][j].y *height;
        let z = detections.multiHandLandmarks[i][j].z;
        point(x,y,z);
        }
        
      }
    }
  }
}

let myp5 = new p5(sketch);