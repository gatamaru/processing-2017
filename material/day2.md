# Processingでビジュアルコーディング (2日目)

おもしろい模様や綺麗なグラフィックを描くための材料を探してみましょう。

本日の内容は発展的な内容なので，1日目に比べると少し難しいかもしれません．理解できない部分があっても気にせずに試してみて下さい．

## 1. 三角関数

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

## 2. ノイズ

### パーリンノイズを使ってみよう

```java
float noiseScale = 0.01;

void setup() {
  size(500, 500);
}

void draw() {
  background(0);
  for (int x = 0; x < width; x++) {
    float xoff = (mouseX + x) * noiseScale;
    float yoff = mouseY * noiseScale;
    float val = noise(xoff, yoff);
    stroke(val * 255);
    line(x, mouseY + val * 80, x, height);
  }
}
```

- [パーリンノイズ - Wikipedia](https://ja.wikipedia.org/wiki/%E3%83%91%E3%83%BC%E3%83%AA%E3%83%B3%E3%83%8E%E3%82%A4%E3%82%BA)
- [`noise()`](https://processing.org/reference/noise_.html)

### パーリンノイズでWave Clock

```java
float radius;
float angle;
float xOffset, yOffset;
float radiusOffset;
float angleOffset;

float strokeColor = 254;
float strokeChange = -1;

void setup() {
  size(500, 500);
  frameRate(30);
  background(255);
  noFill();
}

void draw() {
  float centerX = width / 2;
  float centerY = height / 2;

  radiusOffset += 0.005;
  radius = 550 * noise(radiusOffset) + 1;

  angleOffset += 0.005;
  angle += 6 * noise(angleOffset) - 3;

  if (angle < 0) {
    angle += 360;
  }
  if (360 < angle) {
    angle -= 360;
  }

  xOffset += 0.01;
  yOffset += 0.01;
  float cx = centerX + 100 * noise(xOffset) - 50;
  float cy = centerY + 100 * noise(yOffset) - 50;

  float rad = radians(angle);
  float x1 = radius * cos(rad) + cx;
  float y1 = radius * sin(rad) + cy;
  float x2 = radius * cos(rad + PI) + cx;
  float y2 = radius * sin(rad + PI) + cy;

  strokeColor += strokeChange;
  if (strokeColor < 0) {
    strokeChange = 1;
  }
  if (254 < strokeColor) {
    strokeChange = -1;
  }

  stroke(strokeColor, 60);
  strokeWeight(1);
  line(x1, y1, x2, y2);
}
```

## 3. パーティクル

[参考](http://natureofcode.com/book/chapter-4-particle-systems/)

```java
import java.util.Iterator;

ArrayList<Particle> particles = new ArrayList<Particle>();

void setup() {
  size(500, 500);
}

void draw() {

  particles.add(new Particle(new PVector(width / 2, 100)));

  background(255);
  Iterator<Particle> itr = particles.iterator();
  while (itr.hasNext()) {
    Particle p = itr.next();
    p.update();
    p.display();
    if (p.isDead()) {
      itr.remove();
    }
  }
}

class Particle {

  PVector location;
  PVector velocity;
  PVector acceleration;
  float lifespan;

  Particle(PVector l) {
    acceleration = new PVector(0, 0.05);
    velocity = new PVector(random(-1, 1), random(-2, 0));
    location = l.copy();
    lifespan = 255.0;
  }

  void update() {
    velocity.add(acceleration);
    location.add(velocity);
    lifespan -= 2.0;
  }

  void display() {
    color c = color(200);
    stroke(0, lifespan);
    fill(c, lifespan);
    ellipse(location.x, location.y, 8, 8);
  }

  boolean isDead() {
    return lifespan < 0;
  }
}
```

## 4. フラクタル

### シェルピンスキーのギャスケット (The Sierpinski Gasket)

次のコードを実行してみて下さい．スペースキーを押すと図形が描画されます．

```java
float canvasSize;
int maxDepth = 0;
boolean invalidate = false;

void setup() {
  size(500, 500);
  background(255);
  noFill();
  canvasSize = height  * 0.5;
}

void draw() {
  if (invalidate) {
    background(255);
    pushMatrix();
    translate(width * 0.5, height * 0.6);
    scale(canvasSize);
    strokeWeight(1 / canvasSize);
    drawTriangle(maxDepth);
    popMatrix();
    invalidate = false;
  }
}

void keyPressed() {
  if (key == ' ') {
    maxDepth += 1;
    invalidate = true;
  }
}

void drawTriangle(int depth) {
  float startAngle = -HALF_PI;
  if (depth == 0) {
    beginShape();
    vertex(cos(startAngle), sin(startAngle));
    vertex(
      cos(startAngle + (PI * 2 / 3)),
      sin(startAngle + (PI * 2 / 3))
    );
    vertex(
      cos(startAngle + (PI * 4 / 3)),
      sin(startAngle + (PI * 4 / 3))
    );
    endShape(CLOSE);

   } else {

    // 上の三角形
    pushMatrix();
    translate(0.5 * cos(startAngle), 0.5 * sin(startAngle));
    scale(0.5);
    drawTriangle(depth - 1);
    popMatrix();

    // 右下の三角形
    pushMatrix();
    translate(
      0.5 * cos(startAngle + PI * 2 / 3),
      0.5 * sin(startAngle + PI * 2 / 3)
    );
    scale(0.5);
    drawTriangle(depth - 1);
    popMatrix();

    // 左下の三角形
    pushMatrix();
    translate(
      0.5 * cos(startAngle + PI * 4 / 3),
      0.5 * sin(startAngle + PI * 4 / 3)
    );
    scale(0.5);
    drawTriangle(depth - 1);
    popMatrix();
  }
}
```

### コッホ雪片 (The Koch Snowflake)

次のコードを実行してみて下さい．スペースキーを押すと図形が描画されます．

```java
int maxDepth = 0;
boolean invalidate = false;

void setup() {
  size(500, 500);
  background(255);
  fill(0);
}

void draw() {
  if (invalidate) {
    background(255);
    float x0 = width * 0.22;
    float y0 = height * 0.28;
    float x1 = width * 0.78;
    float y1 = height * 0.28;
    float x2 = x1 + (x1 - x0) * cos(TWO_PI / 3);
    float y2 = y1 + (x1 - x0) * sin(TWO_PI / 3);

    PVector p0 = new PVector(x0, y0);
    PVector p1 = new PVector(x1, y1);
    PVector p2 = new PVector(x2, y2);

    koch(p0, p1, maxDepth);
    koch(p1, p2, maxDepth);
    koch(p2, p0, maxDepth);
    invalidate = false;
  }
}

void keyPressed() {
  if (key == ' ') {
    maxDepth += 1;
    invalidate = true;
  }
}

void koch(PVector p0, PVector p1, int depth) {
  PVector dp = PVector.sub(p1, p0);
  float dist = dp.mag();
  float unit = dist / 3;
  float angle = atan2(dp.y, dp.x);

  PVector pa = new PVector(
    unit * cos(angle) + p0.x,
    unit * sin(angle) + p0.y
  );
  PVector pb = new PVector(
    unit * cos(angle - PI / 3) + pa.x,
    unit * sin(angle - PI / 3) + pa.y
  );
  PVector pc = new PVector(
    2 * unit * cos(angle) + p0.x,
    2 * unit * sin(angle) + p0.y
  );

  if (depth == 0) {
    line(p0.x, p0.y, pa.x, pa.y);
    line(pa.x, pa.y, pb.x, pb.y);
    line(pb.x, pb.y, pc.x, pc.y);
    line(pc.x, pc.y, p1.x, p1.y);
  } else {
    koch(p0, pa, depth - 1);
    koch(pa, pb, depth - 1);
    koch(pb, pc, depth - 1);
    koch(pc, p1, depth - 1);
  }
}
```

## 5. 自由に描いてみましょう2

1日目，2日目で学んだことを利用して自由に描いてみましょう．

## 参考リンク・文献

- [[1] Language Reference (API) \ Processing 2+](https://processing.org/reference/)
- [[2] The Nature of Code](http://natureofcode.com/book/)
- [[3] Playing with Chaos: Programming Fractals and Strange Attractors in JavaScript](http://www.playingwithchaos.net/)
- [[4] ジェネラティブ・アート―Processingによる実践ガイド](http://amzn.asia/1qCCx0X)
