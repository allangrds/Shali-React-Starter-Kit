const path = require('path');
const paths = require('../src/config/paths.js')
const includePath = path.resolve(__dirname, '..');

module.exports = {
  resolve: {
    alias: {
      atoms: path.resolve(__dirname, '../src/client/atoms/'),
      client: path.resolve(__dirname, '../src/client/'),
      fonts: path.resolve(__dirname, '../src/fonts/'),
      helpers: path.resolve(__dirname, '../src/helpers/'),
      images: path.resolve(__dirname, '../src/images/'),
      molecules: path.resolve(__dirname, '../src/client/molecules/'),
      stories: path.resolve(__dirname, '../src/stories/'),
      styles: path.resolve(__dirname, '../src/styles/'),
      tests: path.resolve(__dirname, '../src/tests/'),
    },
    extensions: ['.js', '.jsx', '.css', '.png', '.jpg', '.gif', '.jpeg'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              modules: 1,
              localIdentName: '[path]-[name]-[local]',
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-import'),
                require('postcss-cssnext')({
                  features: {
                    customProperties: false,
                  },
                }),
              ],
            },
          },
        ],
        include: paths.appSrc,
      },
      {
        test: /\.(jpg|png|gif|jpeg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 65000,
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
};
