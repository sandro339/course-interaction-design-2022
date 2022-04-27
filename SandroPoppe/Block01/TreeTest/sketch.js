var axiom ="X";
var steps = axiom;
var rules = [];
var length = 10;
var angle;
let counter = 0;
let time = 60;
let change = false;
var steps1;
var steps2;
var steps3;
var steps4;
var steps5;

rules[0] = {
  a: "F",
  b: "FF"
}
rules[1] = {
  a:"X",
  b:"F+[-F-XF-X][+FF][--XF[+X]][++F-X]"
}
function generateNext(){
  var next = "";
  for(var i = 0; i < steps.length; i++)
  {
    var current = steps.charAt(i);
    var found = false;
    for(var k = 0; k< rules.length; k++)
    {
      if(current == rules[k].a)
      {
        found = true;
        next += rules[k].b;
        break;
      }
    }
    if(!found){
      next += current;
    }
  }
  steps = next;
}
function generate(x){
  if(x == "F"){
    line(0,0,0,+length);
    translate(0,+length);
    push();
  } else if(x == "+"){
    rotate(angle);
    push();
  }else if(x == "-"){
    rotate(-angle);
    push();
  }else if(x == "["){
    push();
    push();
  }else if(x == "]"){
    pop();
    push();
  }else{
    push();
  }
}
function setup(){
  createCanvas(800,800);
  background(0);
  stroke(255);
  translate(400,0);
  generateNext();
  for(var i = 0; i <= 20; i++)
  {
    push();
  }
  angle = radians(25);
  
 
  
}

function draw(){
  
  time --;
  if(time <= 0)
  {
    if(counter < steps.length)
    {
      pop();
      time = 1;
      generate(steps[counter]);
      print(steps[counter]);
      counter++;
      
    }
    else{
      background(0);
      print(steps);
      pop();
      for (let index = 0; index < steps.length; index++) {
        pop();
        generate(steps[index]);
      }
      if(steps1 != null)
      {
        pop();
        for (let index = 0; index < steps1.length; index++) {
        pop();
        generate(steps1[index]);
        }
      }
      if(steps5 != null)
      {
        pop();
        for (let index = 0; index < steps5.length; index++) {
        pop();
        generate(steps5[index]);
        }
      }
      if(steps2 != null)
      {
        pop();
        for (let index = 0; index < steps2.length; index++) {
        pop();
        generate(steps2[index]);
        }
      }
      if(steps3 != null)
      {
        pop();
        for (let index = 0; index < steps3.length; index++) {
        pop();
        generate(steps3[index]);
        }
      }
      if(steps4 != null)
      {
        pop();
        for (let index = 0; index < steps4.length; index++) {
        pop();
        generate(steps4[index]);
        }
      }
      pop();
      steps5 = steps4;
      steps4 = steps3;
      steps3 = steps2;
      steps2 = steps1;
      steps1 = steps;
      generateNext();
    
      change = true;
      counter = 0;
    }
  }

}









