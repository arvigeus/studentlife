
// Base kyt config.
// Edit these properties to make changes.

const path = require('path');

module.exports = {
  reactHotLoader: false,
  debug: false,
  serverURL: 'http://localhost:5000',
  clientURL: 'http://localhost:5001',
  prototypeURL: 'http://localhost:5002',
  modifyWebpackConfig: (kytConfig, options) => {
    const appConfig = Object.assign({}, kytConfig);
    const babelLoader = appConfig.module.rules.find(rule => rule.loader === 'babel-loader');
    babelLoader.options.plugins.push(
      'babel-plugin-transform-class-properties',
      'babel-plugin-transform-object-rest-spread',
      path.resolve(process.cwd(), './src/relay/babelRelayPlugin')
    );
    babelLoader.options.presets.push(
      'react',
      'babel-preset-flow'
    );
    if (!babelLoader.options.presets.env) babelLoader.options.presets.env = {};
    if (!babelLoader.options.presets.env.development) babelLoader.options.presets.env.development = {};
    if (!babelLoader.options.presets.env.development.plugins) {
      babelLoader.options.presets.env.development.plugins = [];
    }
    babelLoader.options.presets.env.development.plugins.push('react-hmre');
    return kytConfig;
  }
};
