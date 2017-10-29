# 補足資料 (その他)

### ランダムウォーク

[ランダムウォーク - Wikipedia](https://ja.wikipedia.org/wiki/%E3%83%A9%E3%83%B3%E3%83%80%E3%83%A0%E3%82%A6%E3%82%A9%E3%83%BC%E3%82%AF)

```java
float prevX;
float prevY;
float stepSize = 5;

void setup() {
  size(500, 500);
  background(255);
  stroke(0, 100);

  prevX = width / 2;
  prevY = height / 2;
}

void draw() {
  float theta = random(0, TWO_PI);
  float x = prevX + stepSize * cos(theta);
  float y = prevY + stepSize * sin(theta);

  line(prevX, prevY, x, y);

  prevX = x;
  prevY = y;
}
```

### ローレンツアトラクタ

[ローレンツ方程式 - Wikipedia](https://ja.wikipedia.org/wiki/%E3%83%AD%E3%83%BC%E3%83%AC%E3%83%B3%E3%83%84%E6%96%B9%E7%A8%8B%E5%BC%8F)

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
