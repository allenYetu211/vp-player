/*
 * @Author: Allen OYang
 * @Date: 2021-09-22 19:08:08
 * @Descripttion: 
 * @LastEditTime: 2022-01-12 15:38:38
 * @FilePath: /plugin-core/packages/xyplayer_react/webpack.config.js
 */
// const webpack = require('webpack');
const path = require('path');

console.log('process.env.NODE_E === production', process.env.NODE_E === 'production')

const config = {
  entry: [
    'react-hot-loader/patch',
    process.env.NODE_E === 'production' ? './src/index.tsx' : './example/index.tsx'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: 'videoPlayer',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader'
        ],
        exclude: /\.module\.css$/
      },
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.svg$/,
        use: 'file-loader'
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              mimetype: 'image/png'
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true
            }
          },
          'postcss-loader'
        ],
        include: /\.module\.css$/
      }
    ]
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.tsx',
      '.ts'
    ],
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  devServer: {
    static: {
      directory: path.join(__dirname, './'),
    },
    compress: true,
    port: 9000,
  }
};

module.exports = config;