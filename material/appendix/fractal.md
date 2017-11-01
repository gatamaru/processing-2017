# 補足資料 (フラクタル)

[[1] Playing with Chaos: Programming Fractals and Strange Attractors in JavaScript](http://www.playingwithchaos.net/) からの抜粋したサンプルをProcessingで実装したものです．

## イテレーションでフラクタル

次のコードを実行してみて下さい．スペースキーを押すと図形が描画されます．

```java
int maxDepth = 0;
boolean invalidate = true;

int numShapes = 3;
float[] angles = {
  0,
  PI * 2 / 3,
  PI * 4 / 3
};
float shapeSize = 0;
float dist = 0;
float scaleFactor = 0.6;

void setup() {
  size(500, 500);
  background(255);
  noStroke();
  fill(0, 120);

  shapeSize = height / 8;
  dist = shapeSize * 1.5;
}

void draw() {
  if (invalidate) {
    background(255);
    pushMatrix();
    translate(width / 2, height / 2);
    drawShape();
    iterate(maxDepth);
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

void drawShape() {
  ellipse(0, 0, shapeSize, shapeSize);
}

void iterate(int depth) {
  for (int i = 0; i < numShapes; i++) {
    pushMatrix();
    rotate(angles[i]);
    translate(dist, 0);
    scale(scaleFactor);
    drawShape();
    if (0 < depth) {
      iterate(depth - 1);
    }
    popMatrix();
  }
}
```

次のパラメータも試してみて下さい．

1. 
```java
float[] angles = { 0.3, 0.3 + PI * 2 / 3, 0.3 + PI * 4 / 3 };
```

2. 
```java
float offset = random(TWO_PI);
float[] angles = { offset, offset + PI * 2 / 3, offset + PI * 4 / 3 };
```

3. 
```java
float[] angles = { random(TWO_PI), random(TWO_PI), random(TWO_PI) };
```

## カオスゲーム [1]

次のコードを実行してみて下さい．

```java
int numPoints = 3;
float r = 0.5;

ArrayList<PVector> points = new ArrayList<PVector>();
ArrayList<PVector> queue = new ArrayList<PVector>();

float radius;
PVector currentPoint;

boolean auto = false;

void setup() {
  size(500, 500);
  background(0);
  noStroke();
  fill(255, 200);

  radius = height * 0.45;

  for (int i = 0; i < numPoints; i++) {
    float angle = i * TWO_PI / numPoints;
    float x = radius * cos(angle);
    float y = radius * sin(angle);
    PVector p = new PVector(x, y);
    points.add(p);
    queue.add(p);
  }

  float x = random(-radius, radius);
  float y = random(-radius, radius);
  currentPoint = new PVector(x, y);
}

void draw() {

  pushMatrix();
  translate(width / 2, height / 2); // 中心に移動
  for (PVector p : queue) {
    ellipse(p.x, p.y, 2, 2);
  }
  popMatrix();
  queue.clear();

  if (auto) {
    nextPoint();
  }
}

void keyPressed() {
  switch (key) {
    case ' ':
      nextPoint();
      break;

    case 's':
      auto = !auto;
      break;
  }
}

void nextPoint() {
  int index = int(random(numPoints));
  PVector p = points.get(index);
  float x = (currentPoint.x + p.x) * r;
  float y = (currentPoint.y + p.y) * r;
  PVector next = new PVector(x, y);
  points.add(next);
  queue.add(next);
  currentPoint = next;
}
```

次のパラメータも試してみて下さい．

1. `numPoints` = 4, `r` = 0.4
2. `numPoints` = 5, `r` = 0.375
3. `numPoints` = 6, `r` = 0.333
4. `numPoints` = 8, `r` = 0.25

## 参考文献

- [[1] Playing with Chaos: Programming Fractals and Strange Attractors in JavaScript](http://www.playingwithchaos.net/)
- [[2] The Nature of Code](http://natureofcode.com/book/chapter-8-fractals/)
