const path = require('path')
const paths = require('./src/config/paths')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = (env, argv) => ({
  entry: paths.appIndexJs,
  output: {
    path: paths.appBuild,
    pathinfo: true,
    filename: 'js/app.js',
  },
  resolve: {
    alias: {
      atoms: path.resolve(__dirname, 'src/client/atoms/'),
      client: path.resolve(__dirname, 'src/client/'),
      fonts: path.resolve(__dirname, 'src/fonts/'),
      helpers: path.resolve(__dirname, 'src/helpers/'),
      images: path.resolve(__dirname, 'src/images/'),
      molecules: path.resolve(__dirname, 'src/client/molecules/'),
      stories: path.resolve(__dirname, 'src/stories/'),
      styles: path.resolve(__dirname, 'src/styles/'),
      tests: path.resolve(__dirname, 'src/tests/'),
    },
    extensions: ['.js', '.jsx', '.css', '.png', '.jpg', '.gif', '.jpeg'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
        include: paths.appSrc,
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
        include: paths.appSrc,
      },
      {
        test: /\.(jpg|png|gif|jpeg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
            outputPath: 'images',
            publicPath: 'images',
            context: 'src/assets/images',
          },
        },
      },
      {
        test: /\.(woff|ttf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
            outputPath: 'fonts',
            publicPath: '../fonts',
            context: 'src/assets/fonts',
          },
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
      filename: 'css/app.css',
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
