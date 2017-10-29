# 補足資料 (三角関数で遊ぶ)

## 基本編

### 三角関数をみてみる

```java
float radius = 75;
float frequency = 2;

float px, py;
float qx;
float angle;

void setup() {
  size(900, 300);
}

void draw() {
  background(0);

  // 円を描く
  noStroke();
  fill(255, 200);
  ellipse(width / 8, 100, radius * 2, radius * 2);

  // 円の周りを回る部分を描く
  float insetX = width / 8;
  px = radius * cos(radians(angle)) + insetX;
  py = radius * sin(radians(angle)) + 100;

  stroke(100);
  line(insetX, 100, px, py);

  fill(255, 255, 0);
  ellipse(px, py, 8, 8);

  // y = sin(x) のカーブを描く

  stroke(255);
  fill(255);
  float theta = 0;
  float end = width - insetX;
  for (int i = 0; i < end; i++) {
    float x = insetX + radius + i;
    float y = radius * sin(radians(theta)) + 100;
    point(x, y);
    theta -= frequency;
  }

  // 円の周りを回っている丸とsinカーブとの関係を描く
  float lx = insetX + radius + qx;
  noStroke();
  fill(0, 255, 255);
  ellipse(lx, py, 7, 7);

  stroke(255, 0, 255, 200);
  line(px, py, lx, py);

  angle -= frequency;
  qx += 1.0;

  // sinカーブの終端まで辿り着いたら始端に戻す
  if (width < lx) {
    qx = 0;
    angle = 0;
  }

  // 曲線のxとyの値を画面に表示する
  stroke(255);
  fill(255);
  textSize(32);

  float adjustedX = radians(-angle);
  float adjustedY = -(py - 100) / radius;
  text("x = " + adjustedX, 50, 275);
  text("y = " + adjustedY, 350, 275);
}
```

### sin波を描く

```java
size(500, 100);

float prevX = -1;
float prevY = -1;

for (int i = 20; i <= 480; i++) {
  float theta = radians(i);
  float x = i;
  float y = 40 * sin(theta) + 50;

  if (0 < prevX) {
    line(x, y, prevX, prevY);
  }
  prevX = x;
  prevY = y;
}
```

### sin関数で変化する色

```java
color color1 = color(253, 125, 22);
color color2 = color(4, 45, 135);

void setup() {
  size(500, 500);
}

void draw() {
  float theta = frameCount / 20.0;
  float y = sin(theta);
  color c = lerpColor(color1, color2, map(y, -1, 1, 0, 1));
  background(c);
}
```

### sin関数で変化する円の半径

```java
void setup() {
  size(500, 500);
}

void draw() {
  background(0);

  float theta = frameCount / 20.0;
  float y = sin(theta);

  float centerX = width / 2;
  float centerY = height / 2;
  float size = map(y, -1, 1, 0, min(width, height));

  fill(255);
  ellipse(centerX, centerY, size, size);
}
```

### 回転

```java
void setup() {
  size(500, 500);
}

void draw() {
  background(0);

  float centerX = width / 2;
  float centerY = height / 2;
  float length = min(width, height) / 2 - 20;

  float theta = frameCount / 40.0;

  float x = length * cos(theta) + centerX;
  float y = length * sin(theta) + centerY;

  fill(255);
  ellipse(x, y, 20, 20);
}
```

### 振り子

```java
float g = 3.0;
Pendulum pendulum;

void setup() {
  size(500, 500);
  PVector o = new PVector(250, 20);
  pendulum = new Pendulum(o, 300);
}

void draw() {
  background(255);
  pendulum.update();
  pendulum.display();
}

class Pendulum {

  PVector origin;
  float length;
  float angle = PI / 6; // 鉛直下向きを0とする
  float velocity;
  float acceleration;

  Pendulum(PVector origin, float length) {
    this.origin = origin;
    this.length = length;
    this.velocity = 0;
    this.acceleration = 0;
  }

  void update() {
    this.acceleration = -1 * g / length * sin(angle);
    velocity += acceleration;
    angle += velocity;
  }

  void display() {
    float x = length * sin(angle);
    float y = length * cos(angle);
    PVector pos = new PVector(x, y);
    pos.add(origin);

    noStroke();
    fill(0);
    ellipse(pos.x, pos.y, 50, 50);
  }
}
```

## 発展編

### Pendulum waves

- [見る](https://www.youtube.com/watch?v=yVkdfJ9PkRQ)

```java
float g = 3.0;
Pendulum[] pendulums;

void setup() {
  size(500, 500);

  PVector o = new PVector(250, 10);
  int n = 20;
  pendulums = new Pendulum[n];
  for (int i = 0; i < 20; i++) {
    float t = (11 + i) / 20.0;
    float b = t / TWO_PI;
    float l = g / (b * b);
    pendulums[i] = new Pendulum(o, l);
  }
}

void draw() {
  background(255);
  for (Pendulum p : pendulums) {
    p.update();
    p.display();
  }
}

class Pendulum {

  PVector origin;
  float length;
  float angle = PI / 6; // 鉛直下向きを0とする
  float velocity;
  float acceleration;

  Pendulum(PVector origin, float length) {
    this.origin = origin;
    this.length = length;
    this.velocity = 0;
    this.acceleration = 0;
  }

  void update() {
    this.acceleration = -1 * g / length * sin(angle);
    velocity += acceleration;
    angle += velocity;
  }

  void display() {
    float x = length * sin(angle);
    float y = length * cos(angle);
    PVector pos = new PVector(x, y);
    pos.add(origin);

    noStroke();
    fill(0);
    ellipse(pos.x, pos.y, 10, 10);
  }
}
```

### Plasma Effect

- [見る](http://deambulatorymatrix.blogspot.jp/2012/07/classic-plasma-effect-1998.html)

```java
float time = 0;
float cellSize = 8;

void setup() {
  size(500, 500);
  noStroke();
}

void draw() {
  float centerX = width / 2;
  float centerY = height / 2;

  for (int x = 0; x < width; x += cellSize) {
    for (int y = 0; y < height; y += cellSize) {
      float v = 0;
      float sx = (x - centerX) / width;
      float sy = (y - centerY) / height;

      v += sin(sx + time);
      v += sin(10 * (sx * sin(time / 2) + sy * cos(time / 3)) + time);

      float cx = sx + 0.5 * sin(time / 5);
      float cy = sy + 0.5 * cos(time / 3);
      v += sin(sqrt(100 * (cx * cx + cy * cy) + 1) + time);

      v /= 3.0;

      float r = map(sin(v * PI), -1, 1, 0, 255);
      float g = map(cos(v * PI), -1, 1, 0, 255);

      fill(r, g, 100);
      rect(x, y, cellSize, cellSize);
    }
  }
  time += 0.05;
}
```
