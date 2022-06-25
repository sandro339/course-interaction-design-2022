// use Chrome Browser
// enable the 'experimental-web-platform-features' flag opening 'chrome://flags'

// serial magic happens here > "libraries/webserial.js" 
// good documentation web serial API: https://web.dev/serial/

let connectButton;
let serialController;
let receivedValues = [];
let HighF,LowF,G,A,B,C,D,E,Kick,Snare,Metro,MetroUp,Clap,Guitar,Metronom;
let looptime;
let time = 0;
var loopedObjects = [];
let currentSound;
let soundPlayed = false;
let instrument = 0;
let library = [];
let pressed = false;
let mapped;
let started = false;
let tempTime = 0;
let looper = false;
let playMetro = false;
let metroDelay = 20;
let metroBeat = 0;
let currentMap;
let volumeString = ">";
let metroSwitch = 1;

class LoopedSound{
  constructor(sound, time, name){
    this.sound = sound;
    this.time = time;
    this.name = name;
  }
}
class Sounds{
  constructor(sound, name, type){
    this.sound = sound;
    this.name = name;
    this.type = type;
  }
}
function preload(){
    Kick = new Sounds(new Array(loadSound('Data/Kick1.wav'),loadSound('Data/Kick2.wav'),loadSound('Data/Kick3.wav'),loadSound('Data/Kick4.wav'),loadSound('Data/Kick5.wav')),"Kick",1);
    Clap = new Sounds(new Array(loadSound('Data/Clap1.wav'),loadSound('Data/Clap2.wav'),loadSound('Data/Clap3.wav'),loadSound('Data/Clap4.wav'),loadSound('Data/Clap5.wav')),"Clap",1);
    Snare = new Sounds(new Array(loadSound('Data/Snare1.wav'),loadSound('Data/Snare2.wav'),loadSound('Data/Snare3.wav'),loadSound('Data/Snare4.wav'),loadSound('Data/Snare5.wav')),"Snare",1);
    Hihat = new Sounds(new Array(loadSound('Data/Hat1.wav'),loadSound('Data/Hat2.wav'),loadSound('Data/Hat3.wav'),loadSound('Data/Hat4.wav'),loadSound('Data/Hat5.wav')),"Hihat",1);
    Guitar = new Sounds(new Array(loadSound('Data/Guitar1.wav'),loadSound('Data/Guitar2.wav'),loadSound('Data/Guitar3.wav'),loadSound('Data/Guitar4.wav'),loadSound('Data/Guitar5.wav')),"Guitar",1);
    Piano = new Sounds(new Array(loadSound('Data/piano-a_A_major.wav'),loadSound('Data/piano-b_B_major.wav'),loadSound('Data/piano-c_C_major.wav'),loadSound('Data/piano-d_D_major.wav'),loadSound('Data/piano-e_E_major.wav')),"Piano",2);
    Metro = new Sounds(new Array(loadSound('Data/Metronome.wav')),"Metro");
    MetroUp = new Sounds(new Array(loadSound('Data/MetronomeUp.wav')),"MetroUP");
    Metronom = new Sounds(null,"Metronom",3);
}
function setup() {
  looptime = 60 * 4
  cuttentSound = Kick;
  library.push(Kick);
  library.push(Snare);
  library.push(Hihat);
  library.push(Clap);
  library.push(Guitar);
  library.push(Piano);
  library.push(Metronom);
  currentSound = Kick.sound[0];
  //canvas = createCanvas(640, 480).parent('canvas');
  serialController = new SerialController(57600);

  
  connectButton = createButton("Initialize Serial Connection");
  connectButton.class("button");
  connectButton.mousePressed(initSerial);
}

function draw() {
  background(255);
  if(!started){
    for(let i = 0; i < loopedObjects.length;i++){
    if(loopedObjects[i].time == time){
      if(loopedObjects[i].name =="M"){
        if(metroSwitch == 1){
          loopedObjects[i].sound.play();
        }
      }else{
        loopedObjects[i].sound.play();
      }
      
    }
  }
  }
  
  if(started){
  time++;
  if(time >= looptime) time = 0;
  for(let i = 0; i < loopedObjects.length;i++){
    if(loopedObjects[i].time == time){
      if(loopedObjects[i].name =="M"){
        if(metroSwitch == 1){
          loopedObjects[i].sound.play();
        }
      }else{
        loopedObjects[i].sound.play();
      }
    }
  }
  
  volumeString =">";
  for(let k = 0; k < mapped;k++){
    volumeString += ">";
  }
 

  serialController.write("RowOne");
  serialController.write(" "); 
  serialController.write("Sound : " + str(library[instrument].name));
  serialController.write("\r\n");
  serialController.write("RowTwo");
  serialController.write(" ");
  if(library[instrument].type == 2){
    serialController.write("Hoehe : " + str(volumeString));
  }else if(library[instrument].type == 1){
    serialController.write("Typ : " + str(volumeString)); 
  }else{
    if(metroSwitch == 0){
      serialController.write("Status : Off"); 
    }else{
      serialController.write("Status : On"); 
    }
  }
  serialController.write("\r\n"); 
  fill(255);
  if (serialController.read() && serialController.hasData()) {
    receivedValues = split(serialController.read(), " ");
    fill(255);
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
        if(library[instrument].type != 3){
          currentSound = library[instrument].sound[0];
        }
        
      }else{
        instrument = 0;
        
        pressed = true;
        if(library[instrument].type != 3){
          currentSound = library[instrument].sound[0];
        }
      }
     }
     if(library[instrument].type != 3){
     if(library[instrument].sound.length > 1){
         mapped = int(map(1023-receivedValues[2],0,1023,0,library[instrument].sound.length));
       if(mapped < library[instrument].sound.length){
        if(currentMap != mapped){
          library[instrument].sound[mapped].play();
        }
        currentMap = mapped;
           currentSound = library[instrument].sound[mapped];
       }else{
         mapped --;
       }
      }
     }else{
        if(receivedValues[2]< 510) metroSwitch = 1;
        else metroSwitch = 0;
       
      }
     if(receivedValues[1] == 0){
       pressed = false;
     }
     if(receivedValues[3] == 1) {
      started = false;
      tempTime = 0;
      loopedObjects = [];
      time = 0;
      metroBeat = 0;
     }

  }
  }else{
    if (serialController.read() && serialController.hasData()) {

      receivedValues = split(serialController.read(), " ");
      if(receivedValues[3] == 1){
        tempTime++;
        looper = true;
        playMetro = true;
        time++;
        metroDelay--;
        if(metroDelay <= 0){
          if(metroBeat %4 == 0){
            loopedObjects.push(new LoopedSound(MetroUp.sound[0],time,"M"));
          }else{
             loopedObjects.push(new LoopedSound(Metro.sound[0],time,"M"));
          }
          metroBeat++;
          metroDelay = 40;
        }
      }else if(looper == true){
        looptime = tempTime;
        tempTime = 0;
        started = true;
      }
    }
  }

  
 

}


function initSerial() {
  serialController.init();
}