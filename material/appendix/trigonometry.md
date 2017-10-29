# 補足資料 (三角関数で遊ぶ)

## Pendulum waves

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

## Plasma Effect

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
