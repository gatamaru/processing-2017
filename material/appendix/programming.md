# 補足資料 (初歩の初歩)

知っておくと良い基礎知識

## コンパイル

ソースコードをコンピュータが処理しやすいかたちに変換する処理のこと．

## 型

- `int` : 整数
- `float` : 小数
- `boolean` : 真偽値
- `String` : 文字列

### 型変換

- `float` への代入 (1)

```java
float x = 10;
println(x); // 7.0
```

- `float` への代入 (2)

```java
int i = 7;
float x = i;
println(x); // 7.0
```

- `int` と `int` の計算結果は `int`

```java
println(7 / 10);
```

- `int` と `float` の計算結果は `float`

```java
println(7 / 10.0); // 0.7
println(7.0 / 10.0); // 0.7
```

## 等号・不等号

- `==` : 等しい
- `!=` : 等しくない

## 変数

- 変数の宣言

```java
int x;
x = 10;
println(x);
```

- 変数を宣言するときに初期化する

```java
int x = 10;
println(x);
```

- 変数の代入（更新）

```java
int x = 7;
println(x);

x = 11;
println(x);
```

- 違う型の変数を宣言

```java
boolean x = true;
println(x);

x = false;
println(x);
```

- 型が違う変数には値を代入できない

```java
int x = 7;
x = 3.0; // エラーになる
println(x);
```

## 制御構文 (`if`, `for`)

## オブジェクト
