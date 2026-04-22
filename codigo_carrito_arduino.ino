// ================================================================
//   ElectroIdentify - Academia Arduino
//   SMART ROBOT CAR - v1.0
// ================================================================
//   Funciones:
//     - Control por Bluetooth (HC-05 o HC-06)
//     - Evasor de Obstáculos (Sensor Ultrasónico HC-SR04)
//     - Seguidor de Línea (Sensores Infrarrojos TCRT5000 x3)
//
//   App Bluetooth recomendada: "Arduino Bluetooth Controller"
//   (disponible en Google Play Store)
//
//   Comandos Bluetooth:
//     F = Avanzar        B = Retroceder
//     L = Girar Izq.     R = Girar Der.
//     S = Detener
//     O = Modo Obstáculo (autónomo)
//     N = Modo Línea     (autónomo)
//     M = Modo Manual    (Bluetooth)
//     0,1,2,3,4 = Niveles de Velocidad
// ================================================================

#include <SoftwareSerial.h>

// --- PINES: Motor Driver L298N ---
#define IN1 2   // Motor Izquierdo - Adelante
#define IN2 3   // Motor Izquierdo - Atrás
#define ENA 5   // Motor Izquierdo - Velocidad (PWM)
#define IN3 4   // Motor Derecho   - Adelante
#define IN4 7   // Motor Derecho   - Atrás
#define ENB 6   // Motor Derecho   - Velocidad (PWM)

// --- PINES: Sensor Ultrasónico HC-SR04 ---
#define TRIG_PIN  9   // Trigger (disparo)
#define ECHO_PIN  8   // Echo    (recepción)
#define DISTANCIA_SEGURA 20  // Distancia mínima en cm antes de detenerse

// --- PINES: Sensores de Línea TCRT5000 ---
#define SENSOR_IZQ A0
#define SENSOR_CEN A1
#define SENSOR_DER A2

// --- PINES: Bluetooth HC-05 ---
#define BT_RX 10   // Conectar al TX del HC-05
#define BT_TX 11   // Conectar al RX del HC-05
SoftwareSerial bluetooth(BT_RX, BT_TX);

// --- Variables Globales ---
int velocidad   = 180;   // 0-255 (PWM)
String modo     = "BT";  // "BT", "OBSTACULO", "LINEA"
long distancia  = 0;

// ================================================================
// SETUP
// ================================================================
void setup() {
  // Configurar pines de motores
  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);
  pinMode(IN3, OUTPUT);
  pinMode(IN4, OUTPUT);
  pinMode(ENA, OUTPUT);
  pinMode(ENB, OUTPUT);

  // Configurar sensor ultrasónico
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);

  // Configurar sensores de línea
  pinMode(SENSOR_IZQ, INPUT);
  pinMode(SENSOR_CEN, INPUT);
  pinMode(SENSOR_DER, INPUT);

  // Iniciar comunicaciones
  bluetooth.begin(9600);
  Serial.begin(9600);

  detener();
  Serial.println("[ ElectroIdentify Smart Car - Listo ]");
  bluetooth.println("LISTO");
}

// ================================================================
// LOOP PRINCIPAL
// ================================================================
void loop() {
  // Leer comandos desde la app Bluetooth
  if (bluetooth.available()) {
    char cmd = (char)bluetooth.read();
    Serial.print("Cmd: "); Serial.println(cmd);
    procesarComando(cmd);
  }

  // Ejecutar modo autónomo seleccionado
  if (modo == "OBSTACULO") {
    modoObstaculo();
  } else if (modo == "LINEA") {
    modoLinea();
  }

  delay(10);
}

// ================================================================
// PROCESAR COMANDO BLUETOOTH
// ================================================================
void procesarComando(char cmd) {
  if (modo == "BT") {
    // Comandos de movimiento (solo en modo manual)
    switch (cmd) {
      case 'F': avanzar();        break;
      case 'B': retroceder();     break;
      case 'L': girarIzquierda(); break;
      case 'R': girarDerecha();   break;
      case 'S': detener();        break;
    }
  }

  // Comandos de modo (siempre disponibles)
  switch (cmd) {
    case 'O': 
      modo = "OBSTACULO"; 
      bluetooth.println("MODO:OBSTACULO");
      break;
    case 'N': 
      modo = "LINEA";     
      bluetooth.println("MODO:LINEA");
      break;
    case 'M': 
      modo = "BT";        
      detener();
      bluetooth.println("MODO:MANUAL");
      break;
    // Niveles de velocidad
    case '0': velocidad =  80; bluetooth.println("VEL:MUY BAJA"); break;
    case '1': velocidad = 130; bluetooth.println("VEL:BAJA");     break;
    case '2': velocidad = 180; bluetooth.println("VEL:MEDIA");    break;
    case '3': velocidad = 220; bluetooth.println("VEL:ALTA");     break;
    case '4': velocidad = 255; bluetooth.println("VEL:MAX");      break;
  }
}

// ================================================================
// CONTROL DE MOTORES
// ================================================================

void avanzar() {
  digitalWrite(IN1, HIGH); digitalWrite(IN2, LOW);
  digitalWrite(IN3, HIGH); digitalWrite(IN4, LOW);
  analogWrite(ENA, velocidad);
  analogWrite(ENB, velocidad);
}

void retroceder() {
  digitalWrite(IN1, LOW);  digitalWrite(IN2, HIGH);
  digitalWrite(IN3, LOW);  digitalWrite(IN4, HIGH);
  analogWrite(ENA, velocidad);
  analogWrite(ENB, velocidad);
}

void girarIzquierda() {
  // Motor izquierdo atrás, motor derecho adelante
  digitalWrite(IN1, LOW);  digitalWrite(IN2, HIGH);
  digitalWrite(IN3, HIGH); digitalWrite(IN4, LOW);
  analogWrite(ENA, velocidad);
  analogWrite(ENB, velocidad);
}

void girarDerecha() {
  // Motor izquierdo adelante, motor derecho atrás
  digitalWrite(IN1, HIGH); digitalWrite(IN2, LOW);
  digitalWrite(IN3, LOW);  digitalWrite(IN4, HIGH);
  analogWrite(ENA, velocidad);
  analogWrite(ENB, velocidad);
}

void detener() {
  digitalWrite(IN1, LOW); digitalWrite(IN2, LOW);
  digitalWrite(IN3, LOW); digitalWrite(IN4, LOW);
  analogWrite(ENA, 0);
  analogWrite(ENB, 0);
}

// ================================================================
// SENSOR ULTRASÓNICO HC-SR04
// ================================================================
long medirDistancia() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  
  long duracion = pulseIn(ECHO_PIN, HIGH, 30000); // timeout 30ms
  long distCm   = duracion * 0.034 / 2;
  return distCm;
}

// ================================================================
// MODO OBSTÁCULO (Autónomo - Ultrasonido)
// ================================================================
void modoObstaculo() {
  distancia = medirDistancia();
  
  // Enviar distancia al celular cada ciclo
  bluetooth.print("D:"); bluetooth.println(distancia);

  if (distancia > 0 && distancia < DISTANCIA_SEGURA) {
    // ¡Obstáculo detectado! Retroceder y girar
    detener();
    delay(300);
    retroceder();
    delay(500);
    girarDerecha();
    delay(400);
  } else {
    avanzar();
  }
  delay(50);
}

// ================================================================
// MODO SEGUIDOR DE LÍNEA (Autónomo - Sensores IR)
// ================================================================
// NOTA: Con TCRT5000, línea negra = LOW (0), superficie blanca = HIGH (1)
// Si tu sensor es inverso, cambia LOW por HIGH abajo.
void modoLinea() {
  int izq = digitalRead(SENSOR_IZQ);
  int cen = digitalRead(SENSOR_CEN);
  int der = digitalRead(SENSOR_DER);

  // Enviar estado de sensores al celular
  bluetooth.print("SENS:");
  bluetooth.print(izq); bluetooth.print(cen); bluetooth.println(der);

  if (cen == LOW) {
    // Centro sobre la línea: avanzar recto
    avanzar();
  } else if (izq == LOW && cen == HIGH && der == HIGH) {
    // Línea detectada a la izquierda: corregir
    girarIzquierda();
    delay(80);
  } else if (der == LOW && cen == HIGH && izq == HIGH) {
    // Línea detectada a la derecha: corregir
    girarDerecha();
    delay(80);
  } else if (izq == LOW && der == LOW) {
    // Ambos lados detectan línea (cruce): avanzar
    avanzar();
  } else {
    // Sin línea detectada: detenerse
    detener();
  }
  delay(20);
}

// ================================================================
// FIN DEL CÓDIGO
// Versión: 1.0 - ElectroIdentify Academia Arduino
// ================================================================
