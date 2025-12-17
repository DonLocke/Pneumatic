#include <WiFi.h>
#include <ESPAsyncWebServer.h>

#define LED 2
#define MOTOR_INA 13
#define MOTOR_INB 14

#define TextOutput "text/plain"
#define Success 200
#define motorSpeed 255
#define lockDistance 80

static AsyncWebServer server(80);

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  pinMode(LED, OUTPUT);
  pinMode(MOTOR_INA, OUTPUT);
  pinMode(MOTOR_INB, OUTPUT);

  // Setup Wifi
  WiFi.mode(WIFI_STA);
  WiFi.begin("NSA_Listening_Post_37C", "--secret--");
  if (WiFi.waitForConnectResult() != WL_CONNECTED) {
    Serial.printf("WiFi Failed!\n");
    return;
  }
  Serial.print("\nConnected to WiF-Fi - IP Address: ");
  Serial.println(WiFi.localIP());

  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request) {
    request->send(Success, TextOutput, "Hello World!");
  });

  server.on("/on", HTTP_GET, [](AsyncWebServerRequest *request) {
    Serial.println("LED Turned On.");
    digitalWrite(LED, HIGH);
    request->send(Success, TextOutput, "Turned LED On");
  });

  server.on("/off", HTTP_GET, [](AsyncWebServerRequest *request) {
    Serial.println("LED Turned Off.");
    digitalWrite(LED, LOW);
    request->send(Success, TextOutput, "Turned LED Off");
  });

  server.on("/motor", HTTP_GET, [](AsyncWebServerRequest *request) {
    Serial.println("Spinning Motor.");
    analogWrite(MOTOR_INA, motorSpeed);
    analogWrite(MOTOR_INB, 0);
    delay(2000);
    Serial.println("Stopping Motor.");
    analogWrite(MOTOR_INA, 0);
    analogWrite(MOTOR_INB, 0);
    request->send(Success, TextOutput, "Motor Spun");
  });

  server.on("/open", HTTP_GET, [](AsyncWebServerRequest *request) {
    if (digitalRead(LED)) {
      request->send(Success, TextOutput, "Already Open");
      return;
    }
    Serial.println("Opening.");
    analogWrite(MOTOR_INA, motorSpeed);
    analogWrite(MOTOR_INB, 0);
    delay(lockDistance);
    analogWrite(MOTOR_INA, 0);
    analogWrite(MOTOR_INB, 0);
    digitalWrite(LED, HIGH);
    request->send(Success, TextOutput, "Open");
  });

  server.on("/close", HTTP_GET, [](AsyncWebServerRequest *request) {
    if (!digitalRead(LED)) {
      request->send(Success, TextOutput, "Already Closed");
      return;
    }
    Serial.println("Closing.");
    analogWrite(MOTOR_INA, 0);
    analogWrite(MOTOR_INB, motorSpeed);
    delay(lockDistance);
    analogWrite(MOTOR_INA, 0);
    analogWrite(MOTOR_INB, 0);
    digitalWrite(LED, LOW);
    request->send(Success, TextOutput, "Closed");
  });

  server.onNotFound(notFound);

  // Start Server
  server.begin();
  Serial.println("Waiting for HTTP Requests...");
}

void loop() {
  // put your main code here, to run repeatedly:
}

void notFound(AsyncWebServerRequest *request) {
    request->send(404, TextOutput, "Not found");
}
