const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = (env, argv) => ({
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './public/assets/js'),
    filename: 'app.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: argv.mode === 'production' && true },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?modules,localIdentName="[name]-[local]-[hash:base64:6]"',
            'postcss-loader',
          ],
        }),
      },
    ],
  },
  plugins: [
    new UglifyJSPlugin({
      uglifyOptions: {
        ecma: 6,
        compress: argv.mode === 'production' && true,
        sourceMap: argv.mode === 'production' && true,
        beautify: argv.mode === 'production' && true,
        extractComments: false,
      },
    }),
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './../../index.html',
      inject: 'body',
      cache: true,
      hash: argv.mode === 'production' && true,
    }),
    new ExtractTextPlugin({
      filename: '../css/app.css',
      allChunks: true,
    }),
  ],
})
