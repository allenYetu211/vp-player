/*
 * @Author: Allen OYang
 * @Date: 2021-07-30 11:57:19
 * @Descripttion: 
 * @LastEditTime: 2021-07-30 11:57:19
 * @FilePath: /plugin-core/packages/xyplayer/webpack.config.js
 */


const polyfill = []

const path = require('path');

const publicConfig = {
  entry: polyfill.concat(['./src/index.ts']),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      }, {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              minimize: true
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      }]
  },
  mode: 'production',
  optimization: {
    minimize: true,
  }
}

const umd = {
  ...publicConfig,
  output: {
    path: `${__dirname}/lib`,
    filename: 'index.umd.js',
    library: 'xyplayer',
    libraryTarget: 'umd'
  },
}

const client = {
  ...publicConfig,
  output: {
    path: `${__dirname}/lib`,
    filename: 'index.client.js',
    library: 'xyplayer',
    libraryTarget: 'window'
  },

}

module.exports = [umd, client]

