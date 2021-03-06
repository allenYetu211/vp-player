/*
 * @Author: Allen OYang
 * @Date: 2021-07-28 18:12:29
 * @Descripttion: 
 * @LastEditTime: 2021-07-28 19:24:51
 * @FilePath: /plugin-core/packages/xyplayerhls/webpack.config.js
 */

const polyfill = []

const umd = {
  entry: polyfill.concat(['./src/index.ts']),
  output: {
    path: `${__dirname}/lib`,
    filename: 'index.umd.js',
    library: 'xyplayerhls',
    libraryTarget: 'umd'
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
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
  externals: {
    'xyplayer': 'xyplayer'
  },
  optimization: {
    minimize: false
  }
}

const client = {
  entry: polyfill.concat(['./src/index.ts']),
  output: {
    path: `${__dirname}/lib`,
    filename: 'index.client.js',
    library: 'Hlsxyplayer',
    libraryTarget: 'window'
  },
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      }, {
        test: /\.js$/,
        loader: 'babel-loader',
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
  externals: {
    'xyplayer': 'xyplayer'
  },
  mode: 'production',
  optimization: {
    minimize: true
  }
}

module.exports = [umd, client]

