# Processingでビジュアルコーディング (1日目)

Processingで実験的にお絵かきしていくための基本的な知識と直感を身につけましょう。

## 1. Processingで「Hello world」

```java
void setup() {
  size(500, 500);
  background(0, 0, 0);
}
```

- [`setup()`](https://processing.org/reference/setup_.html)
- [`size()`](https://processing.org/reference/size_.html)
- [`background()`](https://processing.org/reference/background_.html)

## 2. 色を変えてみる

```java
void setup() {
  size(500, 500);
  background(255, 204, 0);
}
```

- [RGB](https://ja.wikipedia.org/wiki/RGB)

## 3. 図形を書いてみる

```java
void setup() {
  size(500, 500);
}

void draw() {
  fill(255, 0, 0);
  stroke(0, 255, 0);
  ellipse(250.0, 250.0, 100.0, 100.0);
}
```

- [`draw()`](https://processing.org/reference/draw_.html)
- [`ellipse()`](https://processing.org/reference/ellipse_.html)

## 4. 線を書いてみる

```java
void setup() {
  size(500, 500);
  background(0, 0, 0);
}

void draw() {
  stroke(80);
  strokeWeight(8);
  line(80, 80, 400, 80);

  stroke(126);
  strokeWeight(4);
  line(400, 80, 400, 400);

  stroke(200);
  strokeWeight(1);
  line(400, 400, 80, 400);

  stroke(255);
  line(80, 400, 250, 250);
}
```

- [`line()`](https://processing.org/reference/line_.html)

## 5. ランダムを使おう

次のコードを実行してみて下さい．

```java
void setup() {
  float x = random(10);
  println(x);
}

void draw() {
}
```

- [`random()`](https://processing.org/reference/random_.html)

コンソールエリアに何か数値が出力されたでしょうか．プログラムを停止してもう1度実行してみて下さい．おそらく先程と違う数値が出力されたでしょう．`random()`を使うと，使う度に違う値が手に入ります．

次のコードの何度か実行して遊んでみて下さい．

```java
void setup() {
  float red = random(255);
  float green = random(255);
  float blue = random(255);
  background(red, green, blue);
}

void draw() {
}
```

## 6. 図形を動かそう

次のコードを実行してみて下さい．

```java
void setup() {
  println(frameRate);
}

void draw() {
}
```

- [`frameRate`](https://processing.org/reference/frameRate.html)
- [`frameCount`](https://processing.org/reference/frameCount.html)

コンソールエリアに「`10.0`」と表示されました．これは，「1秒間におよそ10回，`draw()`が呼び出される」ことを示しています．これを確認するために，次のコードを実行してみます．(実行したらすぐに停止して下さい．)

```java
void setup() {
}

void draw() {
  println("Hello " + frameCount);
}
```

これ以降，この「繰り返し呼び出される`draw()`」を利用してスケッチを動かします．

### 6-1. 色を変化させる

次のコードを実行するとどんな結果になると思いますか？

```java
void setup() {
  size(500, 500);
}

void draw() {
  int x = frameCount % 256;
  background(x, 0, 0);
}
```

### 6-2. 大きさを変化させる

次のコードを実行するとどんな結果になると思いますか？

```java
void setup() {
  size(500, 500);
}

void draw() {
  int size = frameCount % 500;
  ellipse(width / 2.0, height / 2.0, size, size);
}
```

意外な結果が得られたという人も多いのではないでしょうか？実はProcessingでプログラムが行う描画は全て上書きです．今度は次のコードを試してみて下さい．

```java
void setup() {
  size(500, 500);
}

void draw() {

  background(255);

  int size = frameCount % 500;
  ellipse(width / 2.0, height / 2.0, size, size);
}
```

先ほど学んだ`random()`と組み合わせて遊んでみましょう．

```java
void setup() {
  size(500, 500);
}

void draw() {

  // background(255);

  float x = random(width);
  float y = random(height);
  float size = random(100, 200);
  ellipse(x, y, size, size);
}
```

## 7. インタラクティブなスケッチ

### 7-1. マウスを使う

```java
void setup() {
  size(500, 500);
}

void draw() {
  background(80);
  ellipse(mouseX, mouseY, 50, 50);
}
```

- [`mouseX`](https://processing.org/reference/mouseX.html)
- [`mouseY`](https://processing.org/reference/mouseY.html)

### 7-2. キーボードを使う

```java
boolean isPressed = false;

void setup() {
  size(500, 500);
}

void draw() {
  background(80);
  if (isPressed) {
    ellipse(mouseX, mouseY, 50, 50);
  }
}

void keyPressed() {
  if ((key == 'x') || (key == 'X')) {
    isPressed = true;
  }
}

void keyReleased() {
  isPressed = false;
}
```

## 8. 自由に描いてみましょう

今日学んだことを活かして，自由に絵を描いてみて下さい．

## 参考リンク

- [Language Reference (API) \ Processing 2+](https://processing.org/reference/)
