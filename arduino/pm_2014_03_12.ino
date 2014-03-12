int dustPin=0;
float dustVal=0;
float ppm = 0;
int i=0;
int ledPower=2;
int delayTime=280;
int delayTime2=40;
float offTime=9680;
float voltage=0;
float tempdustdensity=0;
float dustnumber=0;
float ppmpercf=0;
float dustdensity=0;

void setup(){
  Serial.begin(9600);
  pinMode(ledPower,OUTPUT);
  pinMode(4, OUTPUT);
  delay(1000);
  
  i=0;
  ppm=0;
}
 
void loop(){
  i=i+1;
  // ledPower is any digital pin on the arduino connected to Pin 3 on the sensor
  digitalWrite(ledPower,LOW); // power on the LED
  delayMicroseconds(delayTime);
  dustVal=analogRead(dustPin); // read the dust value via pin 5 on the sensor
  ppm=ppm+dustVal;
  delayMicroseconds(delayTime2);
  digitalWrite(ledPower,HIGH); // turn the LED off
  delayMicroseconds(offTime);
  /*
  if(dustVal>8){
    dustnumber=(dustVal*5/1024-0.0356)*120000;
  }else{
    dustnumber=dustVal*52;
  }
  */
//  voltage = dustVal*0.0049;
  //tempdustdensity =(0.172*voltage-0.0999)*2000;
//  Serial.println(float(dustVal*5/1024));
//  pm = ( dustVal*5/1024 -0.5 )/6.25;

/*
  voltage = ppm/i*(5/1024);
  dustdensity = 0.17*voltage-0.1;
  ppmpercf = (voltage-0.0256)*120000;
*/
  Serial.println(dustVal*5/1024);
  i=0;
  ppm=0;
  delay(1000);
  
}
