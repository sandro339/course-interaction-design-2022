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

// These constants won't change. They're used to give names to the pins used:
const int ledPin = 5; // digital pin that LED is attahced to
const int servoPin = 6; // digital pin that servor motor is attahced to
const int analogInPin = 0; // or A0  // digital input pin that the sensor is attached to
const int digitalInPin = 2; // or A0  // digital input pin that the sensor is attached to
const int touchPin = 3;
const int analogPin = 1;
String instrumentNameValue;
int servoValue = 0;           // value used to drive servo motor
int ledValue = 0;           // pwm value used to drive actuator
String r1 = "r1";
String r2 = "r2";
int potiValue = 0;        // value from potentiometer
int switchValue = 0;
int drehding = 0;// value from switch
int touchValue = 0;

unsigned long lastSent = 0;
int updateSerial = 10; // interval to send value via serial port

Servo servoMotor;  // create servo object to control a servo

void setup() {

  // init funken
  lcd.begin(16, 2);
  fnk.begin(57600, 0, 0); // higher baudrate for better performance
  fnk.listenTo("RowOne", rowOne); // however you want to name your callback
  fnk.listenTo("RowTwo", rowTwo); // however you want to name your callback

  // define input pins
  pinMode(digitalInPin, INPUT);
  lcd.begin(16, 2);
  // set RGB backlight
  lcd.setRGB(255, 255, 255);
  // for analog input + output pin no initialization as an input needed !

  // attaches the servo on servo pin to the servo object
  servoMotor.attach(servoPin);
}

void loop() {

  // needed to make FUNKEN work
  fnk.hark();

  // send values sensors to P5.js

  // read the analog pin
  potiValue = analogRead(analogInPin);

  // read the digital pin
  switchValue = digitalRead(digitalInPin);

  drehding = analogRead(analogPin);

  touchValue = digitalRead(touchPin);


  // Do not try to send Serial stuff too often, be prevent this by checking when we sent the last time
  if ((millis() - lastSent) > updateSerial) {

    // message looks like this: "value1 value2 ..."
    // finish message with a line feed > last message with "Serial.println()" instead of "Serial.print()"

    // print sensor value
    Serial.print(potiValue);
    // SPACE
    Serial.print(" ");
    // print switch value
    Serial.print(switchValue);
    Serial.print(" ");
    
    // print switch value
    Serial.print(drehding);
    Serial.print(" ");
    Serial.print(touchValue);
    Serial.print(" ");
    
    // print switch value
    Serial.println(r1);
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print(r1);
    lcd.setCursor(0, 1);
    lcd.print(r2);
    
    // update timestamp last sent
    lastSent = millis();
  }

}

void rowOne(char *c) {

  // get first argument
  char *token = fnk.getToken(c); // is needed for library to work properly, but can be ignored

   r1 = fnk.getRemaining();
  


}
void rowTwo(char *c) {

  // get first argument
  char *token = fnk.getToken(c); // is needed for library to work properly, but can be ignored
   r2 = fnk.getRemaining();
  
 
  


}
