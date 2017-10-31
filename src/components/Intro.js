import React from 'react'

import Storm from './Storm'
import './Intro.css'

const Intro = () => (
  <div className="intro">
    <Storm />
    <section>
      <h1 className="title">Processingでビジュアルコーディング</h1>
      <p className="sub-title">がたまるプログラミングキャンプ2017</p>
      <p className="description">
        このコースではコーディングでお絵描きをします．お絵描きには<a href="https://processing.org/"> "Processing" </a>を使用します．
        線や図形を描画して，おもしろい模様や綺麗なグラフィックを描いてみましょう．
      </p>
    </section>
    <div className="skew-cover" />
  </div>
)

export default Intro
