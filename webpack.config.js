const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const title = 'がたまるプログラミングキャンプ Processingコース'

const PATHS = {
  src: path.join(__dirname, 'src'),
  build: path.resolve(__dirname, 'dist')
}

const config = {

  entry: PATHS.src,

  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },

  plugins: [
    new HtmlWebpackPlugin({
      title,
      template: 'src/entry.ejs'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],

  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /(node_modules|dist\/)/,
      loader: "babel-loader"
    },
    {
      test: /\.css$/,
      loaders: ['style-loader', 'css-loader?importLoaders=1'],
      exclude: ['node_modules']
    },
    {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      exclude: /(node_modules)/,
      loader: "file-loader"
    },
    {
      test: /\.(woff|woff2)$/,
      exclude: /(node_modules)/,
      loader: "url-loader?prefix=font/&limit=5000"
    },
    {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      exclude: /(node_modules)/,
      loader: "url-loader?limit=10000&mimetype=application/octet-stream"
    },
    {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      exclude: /(node_modules)/,
      loader: "url-loader?limit=10000&mimetype=image/svg+xml"
    },
    {
      test: /\.gif/,
      exclude: /(node_modules)/,
      loader: "url-loader?limit=10000&mimetype=image/gif"
    },
    {
      test: /\.jpg/,
      exclude: /(node_modules)/,
      loader: "url-loader?limit=10000&mimetype=image/jpg"
    },
    {
      test: /\.png/,
      exclude: /(node_modules)/,
      loader: "url-loader?limit=10000&mimetype=image/png"
    }
    ]
  },

  devtool: process.env.WEBPACK_DEVTOOL || 'inline-source-map',

  devServer: {
    hot: true
  }
}

module.exports = config
