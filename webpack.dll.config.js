const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    libs: ['react', 'react-dom']
  },
  output: {
      path: path.resolve(__dirname, 'libs'),
      filename: '[name].js',
      library: '[name]',
  },
  plugins: [
      new webpack.DllPlugin({
          path: 'manifest.json',
          name: '[name]',
          context: __dirname,
      }),
  ]
}
