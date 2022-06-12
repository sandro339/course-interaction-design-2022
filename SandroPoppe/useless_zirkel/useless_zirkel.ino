// use one of these digital sensors from your Grove Kit
// https://wiki.seeedstudio.com/Grove-Button/
// https://wiki.seeedstudio.com/Grove-Touch_Sensor/

// use one of these digital actuators from your Grove Kit
// https://wiki.seeedstudio.com/Grove-LED_Socket_Kit/
// https://wiki.seeedstudio.com/Grove-Relay/ > do not connect 220V devices!!!
#include <Servo.h>
// These constants won't change. They're used to give names to the pins used:
const int digitalInPin = 2;  // digital input pin that the sensor is attached to
const int servoPin = 6; // digital pin that servor motor is attahced to

int sensorValue = 0;        // value read from sensor

Servo servoMotor;  // create servo object to control a servo

void setup() {
  // initialize serial communications at 9600 bps:
  Serial.begin(9600);
  
  // initialize digital pin as an input:
  pinMode(digitalInPin, INPUT);
  
  // initialize digital pin as an output:
  servoMotor.attach(servoPin);
}

void loop() {
  
  // read the digital pin
  sensorValue = digitalRead(digitalInPin);

  // print the results to the Serial Monitor:
  Serial.println(sensorValue); // you should get '0' or '1'

  // switch digital actuator on/off
  if(sensorValue == 1){
    servoMotor.write(180);
  }
  else{
    servoMotor.write(0);
  }
  
}
