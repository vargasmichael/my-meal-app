const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  config.devServer = {
    proxy: {
      '/api': 'http://localhost:5555'
    }
  }

  return config;
};
