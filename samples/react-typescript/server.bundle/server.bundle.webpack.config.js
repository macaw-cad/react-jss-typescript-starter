const webpack = require('webpack');
const path = require('path');
const env = require('@babel/preset-env');
const reactApp = require('babel-preset-react-app');


// Webpack build configuration to build the SSR bundle.
// Invoked by build:serverbundle.
module.exports = {
    mode: 'production',
    devtool: 'cheap-eval-source-map',
    entry: path.resolve(__dirname, './server.tsx'),
    target: 'node',
    output: {
      path: path.resolve(__dirname, '../build'),
      filename: '../build/server.bundle.js',
      libraryTarget: 'this',
    },
    optimization: {
      minimize: false,
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
  };
