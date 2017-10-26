import React from 'react'

import './Intro.css'

const Intro = () => (
  <div className="intro">
    <div className="gatamaru"></div>
    <section>
      <h1 className="title">がたまるプログラミングキャンプ</h1>
      <p className="sub-title">Processingでビジュアルコーディング</p>
      <p className="description">
        このコースではコーディングでお絵かきをします．お絵かきには<a href="https://processing.org/"> "Processing" </a>を使用します．
        線や図形を描画して，おもしろい模様や綺麗なグラフィックを描いてみましょう．
      </p>
    </section>
  </div>
)

export default Intro
