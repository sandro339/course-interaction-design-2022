// use Chrome Browser
// enable the 'experimental-web-platform-features' flag opening 'chrome://flags'

// serial magic happens here > "libraries/webserial.js" 
// good documentation web serial API: https://web.dev/serial/


let connectButton;
let serialController;
let receivedValues = [];
let HighF,LowF,G,A,B,C,D,E,Kick,Snare;
let looptime = 300;
let time = 0;
var loopedObjects = [];
let cuttentSound;
let soundPlayed = false;
let instrument = 0;
let library = [];
let pressed = false;

class LoopedSound{
  constructor(sound, time, name){
    this.sound = sound;
    this.time = time;

  }
}
function preload(){
    HighF = loadSound('Data/key13.mp3');
    Kick = loadSound('Data/drumhit_Kick7.wav');
    Snare = loadSound('Data/drumhit_snare3.wav');
    Hihat = loadSound('Data/drumhit_Hat11.wav');
    B = loadSound('Data/key07.mp3');
    C = loadSound('Data/key08.mp3');
    D = loadSound('Data/key10.mp3');
    E = loadSound('Data/key12.mp3');
}

function setup() {

  cuttentSound = Kick;
  library.push(Kick);
  library.push(Snare);
  library.push(Hihat);
  library.push(HighF);
  library.push(B);
  library.push(C);
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

  for(let i = 0; i < loopedObjects.length;i++){
    if(loopedObjects[i].time == time){
      loopedObjects[i].sound.play();
    }
  }

 
 

  // write value to serial port
  serialController.write("WHATEVER");
  serialController.write(" "); // If sending multiple variables, they are seperated with a blank space
  serialController.write(str(time)); // send integer as string
  serialController.write("\r\n"); // to finish your message, send a "new line character"

  // instructions
  fill(255);

  // just if ready
  if (serialController.read() && serialController.hasData()) {
    // split string into array
    receivedValues = split(serialController.read(), " ");
    // show values
    fill(255);
    text("potentiometer: " + receivedValues[0] + "    switch: " + receivedValues[1], 32, height / 2 + 32);
    if(receivedValues[0]>500 && soundPlayed == false){
      soundPlayed = true;
      cuttentSound.play();
      loopedObjects.push(new LoopedSound(cuttentSound,time));
    }
    if(receivedValues[0] < 400){
      soundPlayed = false;
    }
    instrument = int(map(receivedValues[2],0,1023,0,library.length));
    print(instrument);
    cuttentSound = library[instrument];


    // if(receivedValues[1] == 1 && pressed == false){
    //   instrument ++;
    //   print(instrument);
    //   pressed = true;
    //   cuttentSound = library[instrument];
    // }
    // if(receivedValues[1] == 0){
    //   pressed = false;
    // }

  }

}

// init serial connection
function initSerial() {
  serialController.init();
}