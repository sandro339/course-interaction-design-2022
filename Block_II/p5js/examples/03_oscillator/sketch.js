// https://p5js.org/reference/#/p5.Oscillator

var w = window.innerWidth;
var h = window.innerHeight;  

let osc, playing, freq, amp;

function setup() {
  canvas=createCanvas(w,h);

  let cnv = createCanvas(w,h);
  cnv.mousePressed(playOscillator);
  osc = new p5.Oscillator('sine');
}

function draw() {

  background(220)
  freq = constrain(map(mouseX, 0, w, 100, 500), 100, 500);
  amp = constrain(map(mouseY, h, 0, 0, 1), 0, 1);

  text('tap to play', 20, 20);
  text('freq: ' + freq, 20, 40);
  text('amp: ' + amp, 20, 60);

  if (playing) {
    // smooth the transitions by 0.1 seconds
    osc.freq(freq, 0.1);
    osc.amp(amp, 0.1);
  }

}

function playOscillator() {
  // starting an oscillator on a user gesture will enable audio
  // in browsers that have a strict autoplay policy.
  // See also: userStartAudio();
  osc.start();
  playing = true;
}

function mouseReleased() {
  // ramp amplitude to 0 over 0.5 seconds
  osc.amp(0, 0.5);
  playing = false;
}

function windowResized() {
    // assigns new values for width and height variables
    w = window.innerWidth;
    h = window.innerHeight;
    resizeCanvas(w,h);
}