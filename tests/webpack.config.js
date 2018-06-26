const path = require('path');
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
 resolve:{
   "extensions":[".js", ".ts", ".tsx"]
 },
 module: {
    rules: [
      { test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.[tj]sx?$/,
        exclude: /(node_modules)/,
        loaders: ['awesome-typescript-loader','tslint-loader']
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    template : './src/index.html'
  })]
}
