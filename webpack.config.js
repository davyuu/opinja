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
          test: /\.png$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 100000,
                mimetype: 'image/png'
              }
            }
          ]
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
        favicon: './src/images/icons/favicon.ico',
        template: './src/index.html'
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV)
      })
    ]
  }
}
