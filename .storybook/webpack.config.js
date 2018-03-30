const path = require('path');
const includePath = path.resolve(__dirname, '..');

module.exports = {
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
      },
      {
        test: /\.woff$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 65000,
          },
        },
      }
    ],
  },
};
