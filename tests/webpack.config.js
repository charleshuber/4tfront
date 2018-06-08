const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/jsx/app.jsx',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js'
  },
  devtool: 'source-map', //to enable only in dev mode
  stats: {
   colors: true,
   reasons: true
 },
 module: {
    rules: [
      { test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loaders: ['babel-loader','eslint-loader']
      },
      {
        test: /\.tsx?$/,
        exclude: /(node_modules)/,
        loaders: ['awesome-typescript-loader','tslint-loader']
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    template : './src/index.html'
  })]
}
