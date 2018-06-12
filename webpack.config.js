const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')

module.exports = env => {
  console.log('env', env)
  return {
    resolve: {
      extensions: [
        '.jsx',
        '.js',
        '.css'
      ]
    },
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: 'index.js'
    },
    devServer: {
      inline: true,
      contentBase: './public',
      port: 8080
    },
    module: {
      rules: [
        {
          test: /\.(png|jpg)$/,
          loader: 'url-loader'
        },
        {
          test: /\.svg$/,
          loader: 'svg-inline-loader'
        },
        {
          test: /\.css$/,
          use: [ 'style-loader', 'css-loader' ]
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        favicon: './src/images/logos/favicon.ico',
        template: './src/index.html',
        hash: true
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV)
      })
    ]
  }
}
