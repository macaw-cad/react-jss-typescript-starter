var path = require('path');

module.exports = async ({config}) => {
   config.module.rules.push({
    test: /\.(ts|tsx)$/,
    include: [
      path.resolve(__dirname, '.'),
      path.resolve(__dirname, '../src'),
    ],
    loader: require.resolve('awesome-typescript-loader'),
    options: {
      configFileName: 'tsconfig.storybook.json'
    }
  });

  config.module.rules.push({
    test: /\.scss$/,
    loaders: ["style-loader", "css-loader", "sass-loader"],
    include: path.resolve(__dirname, "../src")
  });

  config.resolve.extensions.push('.ts', '.tsx');

  return config;
};