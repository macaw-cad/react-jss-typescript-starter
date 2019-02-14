var path = require('path');

module.exports = (baseConfig, env, defaultConfig) => {
  defaultConfig.node = {
    fs: 'empty',
    tls: 'empty',
    net: 'empty'
  }

  defaultConfig.module.rules.push({
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

  defaultConfig.resolve.extensions.push('.ts', '.tsx');
  
  return defaultConfig;
};