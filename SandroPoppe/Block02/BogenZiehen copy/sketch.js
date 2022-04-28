
let canvas;
let w,h;

let ballX,ballY;
let got = false;
let together = false;
let oldX,oldY,newX,newY;
var customFont;
let Uhr = 0;
let ticked = false;
let tacked = false;
let scaler = 1;
let scaler2 = 1;
let thousand = 0;
let smaller = false;
let windowstart;

let sketch = function(p){
  p.preload = function(){
    customFont = p.loadFont('data/IBM_Plex_Mono/IBMPlexMono-Regular.ttf');
    console.log(customFont);
  }
  p.setup = function(){
    w = 1000;
    h = 800;
    
    console.log(p.textFont());
    canvas = p.createCanvas(w, h, p.WEBGL);
    canvas.id('canvas');
    p.textFont(customFont);
    ballX = 400;
    ballY = 400;
    oldX = 0;
    newX = 0;
    oldY = 0;
    newY = 0;
    p.stroke(0);
    p.strokeWeight(20);
    p.circle(ballX,ballY,10);
  }
  p.draw = function(){
    ballX = w/2;
    ballY = h/2;
    console.log(scaler2);
    
    p.clear();
    p.push();
    p.scale(-1,1);
    p.translate(-p.width/2,-p.height/2);
    p.stroke(0);
    p.strokeWeight(20);
    together = false;
   
    
    if(detections != undefined){
      if(detections.multiHandLandmarks != undefined)
      {
        if(detections.multiHandLandmarks[0] != undefined){
          if(detections.multiHandLandmarks[0][4].x < detections.multiHandLandmarks[0][8].x + 0.05 && detections.multiHandLandmarks[0][4].x > detections.multiHandLandmarks[0][8].x - 0.05 &&detections.multiHandLandmarks[0][4].y < detections.multiHandLandmarks[0][8].y + 0.05 && detections.multiHandLandmarks[0][4].y > detections.multiHandLandmarks[0][8].y - 0.05 ){
          together = true;
          
          
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
    
    if(together == true && got == false && detections.multiHandLandmarks[0][4].x*p.width < ballX + newX*scaler2 +20*scaler2&& detections.multiHandLandmarks[0][4].x*p.width > ballX + newX*scaler2 -20*scaler2 && detections.multiHandLandmarks[0][4].y*p.height < ballY +newY*scaler2+20*scaler2&& detections.multiHandLandmarks[0][4].y*p.height > ballY + newY*scaler2 -20*scaler2){
      got = true;
      oldX = (detections.multiHandLandmarks[0][4].x*p.width-newX);
      oldY = (detections.multiHandLandmarks[0][4].y*p.height-newY);
      console.log("hey");
    }
    if(got == true && together == true){
      newX = (detections.multiHandLandmarks[0][4].x *p.width - oldX);
      newY = (detections.multiHandLandmarks[0][4].y *p.height - oldY);
    }
    if(together == false){
      got = false;
    }
    scaler2 = p.windowWidth/1000;
    p.windowResized = function(){
      
      console.log("rez");
    }
    //ballX *= scaler2;
    if(p.windowWidth > 1000){
      scaler2 = 1;
    }
    //ballY *= scaler2;
    console.log(scaler2);
    ballX += newX*scaler2;
    ballY += newY*scaler2;
    console.log(ballX);
    p.fill(255,0,0);
    p.circle(ballX,ballY,20);
    p.line(w/2,0,ballX,ballY);
    if(ballX > 700 && tacked == false){
      Uhr++
      ticked = !ticked;
      tacked = !tacked;
    }
    if(ballX < 300 && ticked == true){
      Uhr++
      ticked = !ticked;
      console.log("tack");
      tacked = !tacked;
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