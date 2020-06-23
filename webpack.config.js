const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    app: './app.js',
    home: './home',
    detailPage: './detail-page',
    listPage: './list-page',
    vendor: ['react', 'react-dom']
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', {
              modules: false
            }], '@babel/preset-react'],
          }
        }]
      },
      {
        test: /\.(css|scss)$/,
        exclude: /(node_modules|bower_components)/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html'),
      filename: 'index.html',
      chunks: ['app', 'vendor'],
      minify: false
    }),
    new MiniCssExtractPlugin({
      filename: 'app.css',
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  mode: 'production',
  devtool: 'source-map'
}
