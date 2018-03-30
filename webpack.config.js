const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = (env, argv) => ({
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './public/assets/'),
    filename: 'js/app.js',
    publicPath: '/',
  },
  resolve: {
    alias: {
      Stories: path.resolve(__dirname, 'src/stories/'),
      Styles: path.resolve(__dirname, 'src/styles/'),
      Tests: path.resolve(__dirname, 'src/tests/'),
      Client: path.resolve(__dirname, 'src/client/'),
    },
    extensions: ['.js', '.jsx', '.css'],
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
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]',
        },
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
      filename: './index.html',
      inject: 'body',
      cache: true,
      hash: argv.mode === 'production' && true,
    }),
    new ExtractTextPlugin({
      filename: './css/app.css',
      allChunks: true,
    }),
  ],
  devServer: {
    inline: true,
    contentBase: './public',
    port: 3000,
    historyApiFallback: true,
  },
})
