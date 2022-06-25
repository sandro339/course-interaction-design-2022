// use servo from your Grove Kit
// https://wiki.seeedstudio.com/Grove-Servo/

// Funken library
// Download the Funken library here: https://github.com/astefas/Funken/tree/master/bin
// Install with Sketch > Include Library > Add .ZIP Library
#include <Funken.h>
#include <Wire.h>
// servo library
#include <Servo.h>
#include <rgb_lcd.h>

// instantiation of Funken
Funken fnk;
rgb_lcd lcd;


const int ledPin = 5; 
const int servoPin = 6; 
const int analogInPin = 0; 
const int digitalInPin = 2; 
const int touchPin = 3;
const int analogPin = 1;
String instrumentNameValue;
int servoValue = 0;          
int ledValue = 0;           
String r1 = "Start by holding";
String r2 = "the Touch Sensor";
int potiValue = 0;       
int switchValue = 0;
int drehding = 0;
int touchValue = 0;

unsigned long lastSent = 0;
int updateSerial = 10; 

Servo servoMotor; 

void setup() {

 
  lcd.begin(16, 2);
  fnk.begin(57600, 0, 0); 
  fnk.listenTo("RowOne", rowOne); 
  fnk.listenTo("RowTwo", rowTwo); 


  pinMode(digitalInPin, INPUT);
  lcd.begin(16, 2);
 
  lcd.setRGB(255, 255, 255);
  

 
  servoMotor.attach(servoPin);
}

void loop() {


  fnk.hark();



 
  potiValue = analogRead(analogInPin);


  switchValue = digitalRead(digitalInPin);

  drehding = analogRead(analogPin);

  touchValue = digitalRead(touchPin);


  
  if ((millis() - lastSent) > updateSerial) {

 

 
    Serial.print(potiValue);

    Serial.print(" ");
  
    Serial.print(switchValue);
    Serial.print(" ");
    
  
    Serial.print(drehding);
    Serial.print(" ");
    Serial.print(touchValue);
    Serial.print(" ");
    

    Serial.println(r1);
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print(r1);
    lcd.setCursor(0, 1);
    lcd.print(r2);
    

    lastSent = millis();
  }

}

void rowOne(char *c) {


  char *token = fnk.getToken(c); // is needed for library to work properly, but can be ignored

   r1 = fnk.getRemaining();
  


}
void rowTwo(char *c) {

  
  char *token = fnk.getToken(c); // is needed for library to work properly, but can be ignored
   r2 = fnk.getRemaining();
  
 
  


}
