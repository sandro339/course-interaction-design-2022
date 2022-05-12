
let canvas;
let w,h;

let ballX,ballY;
let got = false;
let together = false;
let oldX,oldY,newX,newY;
var customFont = null
let Uhr = 0;
let ticked = false;
let tacked = false;
let scaler = 1;
let scaler2 = 1;
let thousand = 0;
let smaller = false;
let windowstart;


  preload = function(){
    customFont = loadFont('data/IBM_Plex_Mono/IBMPlexMono-Regular.ttf');
    console.log(customFont);
  }
  setup = function(){
    w = 1000;
    h = 800;
    
    console.log(textFont());
    canvas = createCanvas(w, h, WEBGL);
    canvas.id('canvas');
    textFont(customFont);
    ballX = 400;
    ballY = 400;
    oldX = 0;
    newX = 0;
    oldY = 0;
    newY = 0;
    stroke(0);
    strokeWeight(20);
    circle(ballX,ballY,10);
  }
  draw = function(){
    ballX = w/2;
    ballY = h/2;
    console.log(scaler2);
    
    clear();
    push();
    scale(-1,1);
    translate(-width/2,-height/2);
    stroke(0);
    strokeWeight(20);
    together = false;
   
    
    if(detections != undefined){
      if(detections.multiHandLandmarks != undefined)
      {
        if(detections.multiHandLandmarks[0] != undefined){
          if(detections.multiHandLandmarks[0][4].x < detections.multiHandLandmarks[0][8].x + 0.05 && detections.multiHandLandmarks[0][4].x > detections.multiHandLandmarks[0][8].x - 0.05 &&detections.multiHandLandmarks[0][4].y < detections.multiHandLandmarks[0][8].y + 0.05 && detections.multiHandLandmarks[0][4].y > detections.multiHandLandmarks[0][8].y - 0.05 ){
          together = true;
          
          
          }
        }
        drawHands();
        drawLines([0, 5, 9, 13, 17, 0]);//palm
          drawLines([0, 1, 2, 3 ,4]);//thumb
          drawLines([5, 6, 7, 8]);//index finger
          drawLines([9, 10, 11, 12]);//middle finger
          drawLines([13, 14, 15, 16]);//ring finger
          drawLines([17, 18, 19, 20]);//pinky
      }
    }
    
    if(together == true && got == false && detections.multiHandLandmarks[0][4].x*width < ballX + newX*scaler2 +20*scaler2&& detections.multiHandLandmarks[0][4].x*width > ballX + newX*scaler2 -20*scaler2 && detections.multiHandLandmarks[0][4].y*height < ballY +newY*scaler2+20*scaler2&& detections.multiHandLandmarks[0][4].y*height > ballY + newY*scaler2 -20*scaler2){
      got = true;
      oldX = (detections.multiHandLandmarks[0][4].x*width-newX);
      oldY = (detections.multiHandLandmarks[0][4].y*height-newY);
      console.log("hey");
    }
    if(got == true && together == true){
      newX = (detections.multiHandLandmarks[0][4].x *width - oldX);
      newY = (detections.multiHandLandmarks[0][4].y *height - oldY);
    }
    if(together == false){
      got = false;
    }
    scaler2 = windowWidth/1000;
    windowResized = function(){
      
      console.log("rez");
    }
    //ballX *= scaler2;
    if(windowWidth > 1000){
      scaler2 = 1;
    }
    //ballY *= scaler2;
    console.log(scaler2);
    ballX += newX*scaler2;
    ballY += newY*scaler2;
    console.log(ballX);
    fill(255,0,0);
    circle(ballX,ballY,20);
    line(w/2,0,ballX,ballY);
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
      pop();
      stroke(0);
      textSize(40);
      text(0);
      fill(0);
      textAlign(CENTER);
      translate(-width/2,-height/2);
      text("Tack", w/2, 200);
    }else if(Uhr != 0){
      pop();
      stroke(0);
      textSize(40);
      text(0);
      fill(0);
      textAlign(CENTER);
      translate(-width/2,-height/2);
      text("Tick", w/2, 200);
    }

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
      console.log("reset")
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
      for(let j = 0; j < detections.multiHandLandmarks[i].length;j++)
      {
        stroke(0);
        let x = detections.multiHandLandmarks[i][j].x *width;
        let y = detections.multiHandLandmarks[i][j].y *height;
        let z = detections.multiHandLandmarks[i][j].z;
        point(x,y,z);
      }
    }
  }
