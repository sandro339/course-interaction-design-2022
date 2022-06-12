#include <rgb_lcd.h>


// use one of these analog sensors from your Grove Kit
// https://wiki.seeedstudio.com/Grove-Rotary_Angle_Sensor/
// https://wiki.seeedstudio.com/Grove-Light_Sensor/
// https://wiki.seeedstudio.com/Grove-Temperature_Sensor/ > look at code example
// https://wiki.seeedstudio.com/Grove-Sound_Sensor/ > look at code example

// use Grove - LCD RGB Backlight from your Grove Kit and connect it to I2C pin
// https://wiki.seeedstudio.com/Grove-LCD_RGB_Backlight/
// source https://github.com/Seeed-Studio/Grove_LCD_RGB_Backlight

// libraries
#include <Wire.h>


// These constants won't change. They're used to give names to the pins used:
const int temperaturePin = 1; // or A0  // digital input pin that the sensor is attached to
const int B = 4275;               // B value of the thermistor
const int R0 = 100000;   
const int sensorPin = 2;
      // value read from sensor

// LCD Display
rgb_lcd lcd;
int colorR = 0;
int colorG = 0;
int colorB = 0;



void setup()
{
  // set up the LCD's number of columns and rows:
  lcd.begin(16, 2);
  delay(1000);
}

void loop() {

  // read the analog pin
  int rotate = analogRead(sensorPin);
  int a = analogRead(temperaturePin);
  float R = 1023.0/a-1.0;
  R = R0*R;
  float temperature = 1.0/(log(R/R0)/B+1/298.15)-273.15;
  float T = 1023.0/rotate-1.0;
  T = R0*T;
  float faketemp = 1.0/(log(T/R0)/B+1/298.15)-273.15;
  // set RGB backlight
  colorR = map(temperature, 0, 1023, 0, 255);
  lcd.setRGB(colorR, colorG, colorB);

  // print (show) text on LCD
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Ziel  //  Echt");
  lcd.setCursor(0, 1);
  lcd.print(String(faketemp)+String(" //  ")+String(temperature));
    

  // to slow down for LCD
  delay(100);
}
