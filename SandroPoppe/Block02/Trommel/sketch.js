
let canvas;
let w,h;
var customFont;
let scaler = 1;
let scaler2 = 1;
let Uhr = 0;
let smaller = false;
let bang1 = false;
let bang2 = false;
let bang;
let bang_2;
let stopthebang1 = true;
let stopthebang2 = true;


let sketch = function(p){
  p.preload = function(){
    customFont = p.loadFont('data/IBM_Plex_Mono/IBMPlexMono-Regular.ttf');
    bang_2 = p.loadSound('data/drum-kit-old-school-snare_E_major.wav')
    bang = p.loadSound('data/percussion-snare-slap_5bpm_D_major.wav');
    console.log(customFont);
  }
  p.setup = function(){
    w = 1000;
    h = 800;
    console.log(p.textFont());
    canvas = p.createCanvas(w, h, p.WEBGL);
    canvas.id('canvas');
    p.textFont(customFont);
    p.stroke(0);
    p.strokeWeight(20);

  }
  p.draw = function(){

    p.clear();
    p.push();
    p.scale(-1,1);
    p.translate(-p.width/2,-p.height/2);
    p.stroke(0);
    p.strokeWeight(180*scaler2);
    p.point(300*scaler2,600*scaler2);
    p.stroke(255,0,0);
    p.strokeWeight(80*scaler2);
    p.point(300*scaler2,600*scaler2);
    p.stroke(0);
    p.strokeWeight(180*scaler2);
    p.point(700*scaler2,600*scaler2);
    p.stroke(255,0,0);
    p.strokeWeight(80*scaler2);
    p.point(700*scaler2,600*scaler2);
    if(detections != undefined){
      if(detections.multiHandLandmarks != undefined)
      {
        p.drawHands();
        if(detections.multiHandLandmarks[0] != undefined&&detections.multiHandLandmarks[1] != undefined){
           if(stopthebang1 == true && detections.multiHandLandmarks[0][0].x*p.width<300*scaler2+90*scaler2&&detections.multiHandLandmarks[0][0].x*p.width>300*scaler2-90*scaler2&&detections.multiHandLandmarks[0][0].y*p.height<600*scaler2+90*scaler2&&detections.multiHandLandmarks[0][0].y*p.height>600*scaler2-90*scaler2)
           {
             bang1 = true;
           }
           else if(!(detections.multiHandLandmarks[0][0].x*p.width<300*scaler2+90*scaler2&&detections.multiHandLandmarks[0][0].x*p.width>300*scaler2-90*scaler2&&detections.multiHandLandmarks[0][0].y*p.height<600*scaler2+90*scaler2&&detections.multiHandLandmarks[0][0].y*p.height>600*scaler2-90*scaler2)){
             bang1 = false;
             console.log("out");
             stopthebang1 = true;
           }
           if(stopthebang2 == true && detections.multiHandLandmarks[1][0].x*p.width<700*scaler2+90*scaler2&&detections.multiHandLandmarks[1][0].x*p.width>700*scaler2-90*scaler2&&detections.multiHandLandmarks[1][0].y*p.height<600*scaler2+90*scaler2&&detections.multiHandLandmarks[1][0].y*p.height>600*scaler2-90*scaler2)
           {
             bang2 = true;
           }
           else if(!(detections.multiHandLandmarks[1][0].x*p.width<700*scaler2+90*scaler2&&detections.multiHandLandmarks[1][0].x*p.width>700*scaler2-90*scaler2&&detections.multiHandLandmarks[1][0].y*p.height<600*scaler2+90*scaler2&&detections.multiHandLandmarks[1][0].y*p.height>600*scaler2-90*scaler2)){
             bang2 = false;
             console.log("out");
             stopthebang2 = true;
           }
        }
       
      }
    }
    console.log(bang1);
    if(bang1 == true){
      bang.play();
      bang1 = false,
      stopthebang1 = false;
    }
    if(bang2 == true){
      bang_2.play();
      bang2 = false,
      stopthebang2 = false;
    }
    
    scaler2 = p.windowWidth/1000;
    p.fill(255,0,0);
    
    
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
  
  p.drawHands = function(){
    p.stroke(0);
    p.strokeWeight(10);
    for(let i = 0;i< detections.multiHandLandmarks.length;i++){
      for(let j = 0; j < 1;j++)
      {
        p.stroke(255,200,30);
        let x = detections.multiHandLandmarks[i][j].x *p.width;
        let y = detections.multiHandLandmarks[i][j].y *p.height;
        let z = detections.multiHandLandmarks[i][j].z;
        p.strokeWeight(40*scaler2);
        p.fill(255);
        p.point(x,y,z);
        p.strokeWeight(10*scaler2);
        p.line(x,y,x,y+100*scaler2);
      }
    }
  }
}

let myp5 = new p5(sketch);