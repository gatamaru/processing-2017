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

### 反応拡散シミュレーション

[Reaction-Diffusion Tutorial](http://karlsims.com/rd.html)

```java
float[][][] grid;
float[][][] next;

final float DIFF_A = 1.0;
final float DIFF_B = 0.5;
final float FEED = 0.0545;
final float KILL = 0.062;

final float DELTA_TIME = 1.2;

void setup() {
  size(400, 400);

  int w = width;
  int h = height;

  pixelDensity(1);
  grid = new float[w][h][2];
  next = new float[w][h][2];

  float size = 40.0;

  for (int x = 0; x < w; x++) {
    for (int y = 0; y < h; y++) {
      if ((w - size) / 2.0 <= x &&
          (h - size) / 2.0 <= y &&
          x < (w + size) / 2.0 &&
          y < (h + size) / 2.0) {
        grid[x][y][0] = 0.0;
        grid[x][y][1] = 1.0;
      } else {
        grid[x][y][0] = 1.0;
        grid[x][y][1] = 0.0;
      }

      next[x][y][0] = 0.0;
      next[x][y][1] = 0.0;
    }
  }
}

int calcIndex(int i, int max) {
  if (i < 0) return max;
  if (max < i) return 0;
  return i;
}

float laplacian(float[][][] g, int ch, int x, int y) {
  int w = width - 1, h = height - 1;
  float result = 0.0;
  result += g[x][y][ch] * (-1.0);
  result += g[calcIndex(x + 1, w)][y][ch] * 0.2;
  result += g[calcIndex(x - 1, w)][y][ch] * 0.2;
  result += g[x][calcIndex(y + 1, h)][ch] * 0.2;
  result += g[x][calcIndex(y - 1, h)][ch] * 0.2;
  result += g[calcIndex(x - 1, w)][calcIndex(y - 1, h)][ch] * 0.05;
  result += g[calcIndex(x + 1, w)][calcIndex(y - 1, h)][ch] * 0.05;
  result += g[calcIndex(x - 1, w)][calcIndex(y + 1, h)][ch] * 0.05;
  result += g[calcIndex(x + 1, w)][calcIndex(y + 1, h)][ch] * 0.05;
  return result;
}

void draw() {
  for (int x = 0; x < width; x++) {
    for (int y = 0; y < height; y++) {
      float a = grid[x][y][0];
      float b = grid[x][y][1];

      float nextA = a + (
        DIFF_A * laplacian(grid, 0, x, y)
        - a * b * b
        + FEED * (1.0 - a)) * DELTA_TIME;
      float nextB = b + (
        DIFF_B * laplacian(grid, 1, x, y)
        + a * b * b
        - (KILL + FEED) * b) * DELTA_TIME;

      next[x][y][0] = nextA;
      next[x][y][1] = nextB;
    }
  }

  loadPixels();
  for (int x = 0; x < width; x++) {
    for (int y = 0; y < height; y++) {
      float a = next[x][y][0];
      float b = next[x][y][1];
      int i = (x + y * width);
      int v = constrain(floor((a - b) * 255), 0, 255);
      pixels[i] = color(v, v, v, 255);
    }
  }
  updatePixels();

  // swap grids
  float[][][] temp = grid;
  grid = next;
  next = grid;
}
```

次のパラメータも試してみて下さい．

1. `FEED = 0.055`, `KILL = 0.062`
2. `FEED = 0.0367`, `KILL = 0.0649`
