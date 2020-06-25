const path = require('path');
const webpack = require('webpack');
const Analyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const DashboardPlugin = require('webpack-dashboard/plugin');
const SpeadMeasurePlugin = require('speed-measure-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const smp = new SpeadMeasurePlugin();

module.exports = smp.wrap({
  context: path.resolve(__dirname, 'src'),
  entry: {
    app: './app.js',
    home: './home',
    detailPage: './detail-page',
    listPage: './list-page',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
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
            "plugins": ["react-hot-loader/babel"]
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
      chunks: ['app'],
      minify: false
    }),
    new MiniCssExtractPlugin({
      filename: 'app.css',
    }),
    new DashboardPlugin()
  ],
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all'
  //   }
  // },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  mode: 'development',
  devServer: {
    hot: true
  }
  // devtool: 'source-map'
})
