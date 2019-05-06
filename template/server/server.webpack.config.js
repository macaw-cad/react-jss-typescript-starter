const webpack = require('webpack');
const path = require('path');
const env = require('@babel/preset-env');
const reactApp = require('babel-preset-react-app');

// Webpack build configuration to build the node server.
// Invoked by build:server:development or build:server:production.

module.exports = {
  mode: process.env.NODE_ENV,
  devtool: process.env.NODE_ENV !== 'production' ? 'source-map' : 'source-map',
  entry: {
    'index': path.resolve(__dirname, './index.ts'),
  },
  target: 'node',
  output: {
    path: path.resolve(__dirname, '.'),
    filename: '../build.server/[name].js',
    libraryTarget: 'this',
  },
  optimization: {
    minimize: process.env.NODE_ENV !== 'production' ? false : true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [env, reactApp],
          },
        },
      },

      {
        test: /\.m?jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [env, reactApp],
          },
        },
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: { loader: 'html-loader' },
      },
      {
        // anything not JS or HTML, we load as a URL
        // this makes static image imports work with SSR
        test: /\.(?!js|mjs|jsx|ts|tsx|html|graphql$)[^.]+$/,
        exclude: /node_modules/,
        use: {
          loader: 'url-loader',
        },
      },
      {
        // anything in node_modules that isn't js,
        // we load as null - e.g. imported css from a module,
        // that is not needed for SSR
        test: /\.(?!js|mjs|jsx|ts|tsx|html|graphql$)[^.]+$/,
        include: /node_modules/,
        use: {
          loader: 'null-loader',
        },
      },
    ],
  },
  plugins: [
    new webpack.NormalModuleReplacementPlugin(
      /\/iconv-loader$/, require.resolve('node-noop')
    )
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
}

