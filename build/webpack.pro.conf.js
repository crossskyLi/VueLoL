const baseConfig = require('./webpack.conf');
const mode = "production";

const buildConfig = Object.assign({
  mode,
}, baseConfig)
module.exports = buildConfig;