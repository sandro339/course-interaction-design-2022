// use Chrome Browser
// enable the 'experimental-web-platform-features' flag opening 'chrome://flags'

// serial magic happens here > "libraries/webserial.js" 
// good documentation web serial API: https://web.dev/serial/


let connectButton;
let serialController;
let receivedValues = [];
let HighF,LowF,G,A,B,C,D,E,Kick,Snare;
let looptime;
let time = 0;
var loopedObjects = [];
let currentSound;
let soundPlayed = false;
let instrument = 0;
let library = [];
let pressed = false;
let loops = 4;
let mapped;

class LoopedSound{
  constructor(sound, time){
    this.sound = sound;
    this.time = time;

  }
}
class Sounds{
  constructor(sound, name){
    this.sound = sound;
    this.name = name;
  }
}
function preload(){
    Kick = new Sounds(new Array(loadSound('Data/drumhit_Kick7.wav')),"Kick");
    Snare = new Sounds(new Array(loadSound('Data/drumhit_snare3.wav')),"Snare");
    Hihat = new Sounds(new Array(loadSound('Data/drumhit_Hat11.wav')),"Hihat");
    Piano = new Sounds(new Array(loadSound('Data/piano-a_A_major.wav'),loadSound('Data/piano-b_B_major.wav'),loadSound('Data/piano-c_C_major.wav'),loadSound('Data/piano-d_D_major.wav'),loadSound('Data/piano-e_E_major.wav')),"Piano");
   
}

function setup() {
  looptime = 60 * loops
  cuttentSound = Kick;
  library.push(Kick);
  library.push(Snare);
  library.push(Hihat);
  library.push(Piano);
  currentSound = Kick.sound[0];
  // canvas
  canvas = createCanvas(640, 480).parent('canvas');

  // init serial connection with baudrate
  serialController = new SerialController(57600);

  // init gui
  connectButton = createButton("Initialize Serial Connection");
  connectButton.class("button");
  connectButton.mousePressed(initSerial);
}

function draw() {

  // background
  background(0);
  time++;
  if(time >= looptime) time = 0;
  looptime = 60 * loops
  for(let i = 0; i < loopedObjects.length;i++){
    if(loopedObjects[i].time == time){
      loopedObjects[i].sound.play();
    }
  }
  let help = "Help";
 
 

  // write value to serial port
  serialController.write("RowOne");
  serialController.write(" "); 
  //print(library[instrument].name);
  serialController.write("Sound : " + str(library[instrument].name)); // send integer as string
  serialController.write("\r\n"); // to finish you
  serialController.write("RowTwo");
  serialController.write(" "); // If sending multiple variables
  serialController.write("Hoehe : " + str(mapped)); // send integer as string
  serialController.write("\r\n"); // to finish your message, send a "new line character"

  // instructions
  fill(255);
  
  // just if ready
  if (serialController.read() && serialController.hasData()) {
    // split string into array
    receivedValues = split(serialController.read(), " ");
    // show values
    fill(255);
    print(receivedValues[3]);
    text("potentiometer: " + receivedValues[2] + "    switch: " + receivedValues[1], 32, height / 2 + 32);
    if(receivedValues[0]>500 && soundPlayed == false){
      soundPlayed = true;
      currentSound.play();
      loopedObjects.push(new LoopedSound(currentSound,time));
    }
    if(receivedValues[0] < 400){
      soundPlayed = false;
    }

    if(receivedValues[1] == 1 && pressed == false){
      if(instrument<library.length-1){
        instrument ++;
        pressed = true;
        currentSound = library[instrument].sound[0];
      }else{
        instrument = 0;
        
        pressed = true;
        currentSound = library[instrument].sound[0];
      }
     }
     if(library[instrument].sound.length > 1){
        mapped = int(map(receivedValues[2],0,1000,0,library[instrument].sound.length));
       if(mapped < library[instrument].sound.length){
           currentSound = library[instrument].sound[mapped];
       }else{
         mapped --;
       }
       
     }
     if(receivedValues[1] == 0){
       pressed = false;
     }

  }

}

// init serial connection
function initSerial() {
  serialController.init();
}