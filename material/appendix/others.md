# 補足資料 (その他)

### ローレンツアトラクタ

```java
float a = 20;
float b = 8.0 / 3;
float c = 28;
float scale = 7;
float dt = 0.01;
float x, y, z;

void setup() {
  size(500, 500);
  background(0);
  stroke(255, 100);

  x = random(-0.5, 0.5);
  y = random(-0.5, 0.5);
  z = random(-0.5, 0.5);
}

void draw() {
  float nextX = x + (a * (y - x)) * dt;
  float nextY = y + (x * (c - z) - y) * dt;
  float nextZ = z + (x * y - b * z) * dt;
  pushMatrix();
  translate(width / 2, 50);
  line(x * scale, z * scale, nextX * scale, nextZ * scale);
  popMatrix();
  x = nextX;
  y = nextY;
  z = nextZ;
}
```
