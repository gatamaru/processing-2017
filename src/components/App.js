import React from 'react'

import Intro from './Intro'
import Footer from './Footer'
import './App.css'

const App = () => (
  <div className="app">
    <Intro />
    <main>

      <h1><i className="twa twa-1f3a9"></i> コンテンツ</h1>

      <div className="container-day day01">

        <h2><i className="twa twa-1f423"></i> 1日目 (2017/11/03)</h2>

        <h3>テーマ</h3>

        <p className="description">Processingで実験的にお絵かきしていくための基本的な知識と直感を身につけましょう。</p>

        <h3>目次</h3>

        <ul className="toc">
          <li>Processingで「Hello world」</li>
          <li>色を変えてみる</li>
          <li>図形を書いてみる</li>
          <li>線を書いてみる</li>
          <li>ランダムを使う</li>
          <li>図形を動す</li>
          <li>インタラクティブなスケッチ</li>
          <li>自由に描いてみましょう</li>
        </ul>

      </div>

      <div className="container-day day02">

        <h2><i className="twa twa-1f425"></i> 2日目 (2017/11/04)</h2>

        <h3>テーマ</h3>
        <p className="description">おもしろい模様や綺麗なグラフィックを描くための材料を探してみましょう。</p>

        <h3>目次</h3>

        <ul className="toc">
          <li>三角関数</li>
          <li>ノイズ</li>
          <li>パーティクル</li>
          <li>フラクタル</li>
          <li>自由に描いてみましょう2</li>
        </ul>

      </div>

      <div className="container-day day02">
        <h2><i className="twa twa-1f426"></i> 3日目 (2017/11/05)</h2>

        <h3>テーマ</h3>
        <p className="description">自分の作品を発表しましょう。</p>

        <h3>目次</h3>
        <ul className="toc">
          <li>自由に描いてみましょう3</li>
          <li>発表会</li>
        </ul>
      </div>

      <h1><i className="twa twa-2728"></i> 関連・参考リンク</h1>

      <ul className="reference">
        <li><a href="https://www.city.niigata.lg.jp/business/kigyo/sokushinho/it_contents/kigyo20170707.html" target="_blank">新潟市におけるプログラミング教育の取り組み</a></li>
        <li><a href="http://www.codeforniigata.org/" target="_blank">Code for Niigata | コードを紡いで、地域を繋ぐ</a></li>
        <li><a href="http://natureofcode.com/book/" target="_blank">The Nature of Code</a></li>
        <li><a href="https://www.openprocessing.org/" target="_blank">OpenProcessing - Algorithmic Designs Created with Processing</a></li>
      </ul>
    </main>
    <Footer />
  </div>
)

export default App
