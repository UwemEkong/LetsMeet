const path = require('path');
const webpack  = require('webpack');

module.exports = {
  entry: {
      index: './src/index.js'
  },
  devServer: {
      historyApiFallback: true
  },
  plugins: [
    new webpack.ProvidePlugin({
        "React": "react"
    })
  ],
  module: {
    rules: [
        {
            test: /\.js/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-react']
                }
            }
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        },
        {
            test: /\.svg$/,
            use: ['svg-url-loader']
        }
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'backend', 'static', 'js'),
  },
}