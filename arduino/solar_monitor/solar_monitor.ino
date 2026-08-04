#include <Servo.h>

Servo cleanerServo;

int ldrPin = A0;

int voltagePin = A1;

bool isCleaning = false;

void setup() {

  Serial.begin(9600);

  cleanerServo.attach(9);

  cleanerServo.write(0);
}

void loop() {

  int ldrRaw =
    analogRead(ldrPin);

  int voltageRaw =
    analogRead(voltagePin);

  float lightIntensity =
    map(ldrRaw, 0, 1023, 0, 1000);

  float voltage =
    (voltageRaw * 5.0 / 1023.0) * 5;

  float expectedOutput =
    lightIntensity * 0.0125;

  float actualOutput =
    voltage * 0.8;

  float efficiency =
    (actualOutput / expectedOutput)
    * 100;

  if (
    efficiency < 60 &&
    lightIntensity > 600
  ) {

    isCleaning = true;

    cleanerServo.write(180);

    delay(1000);

    cleanerServo.write(0);

  } else {

    isCleaning = false;
  }

  Serial.print(lightIntensity);

  Serial.print(",");

  Serial.print(voltage);

  Serial.print(",");

  Serial.print(expectedOutput);

  Serial.print(",");

  Serial.print(actualOutput);

  Serial.print(",");

  Serial.print(efficiency);

  Serial.print(",");

  Serial.println(isCleaning);

  delay(2000);
}