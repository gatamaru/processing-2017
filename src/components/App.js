import React from 'react'

import Intro from './Intro'
import Footer from './Footer'
import './App.css'

const App = () => (
  <div className="app">
    <Intro />
    <main>

      <h2><i class="twa twa-2328"></i> コンテンツ</h2>

      <h3>1日目</h3>

      <ul>
        <li>Processingで「Hello world」</li>
        <li>色を変えてみる</li>
        <li>図形を書いてみる</li>
        <li>線を書いてみる</li>
        <li>おもしろい線を書いてみる</li>
        <li>図形を動かそう</li>
        <li>インタラクティブな描画</li>
      </ul>

      <h3>2日目</h3>

      <ul>
        <li>乱数を使ってみよう</li>
        <li>パーティクル</li>
        <li>フラクタル</li>
        <li>自由に書いてみよう</li>
      </ul>

      <h3>3日目</h3>
      <ul>
        <li>自由に書いてみよう2</li>
        <li>発表会</li>
      </ul>

      <h2><i class="twa twa-1f4da"></i> 学習</h2>

      <ul>
        <li><a href="http://natureofcode.com/book/">The Nature of Code</a></li>
        <li><a href="https://www.openprocessing.org/">OpenProcessing - Algorithmic Designs Created with Processing</a></li>
      </ul>

      <h2><i class="twa twa-2728"></i>リンク</h2>

      <ul>
        <li><a href="https://www.city.niigata.lg.jp/business/kigyo/sokushinho/it_contents/kigyo20170707.html">新潟市におけるプログラミング教育の取り組み</a></li>
        <li><a href="http://www.codeforniigata.org/">Code for Niigata | コードを紡いで、地域を繋ぐ</a></li>
      </ul>
    </main>
    <Footer />
  </div>
)

export default App
