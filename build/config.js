const path = require('path');
const resolve = require('./util').resolve;

const config = {
  alias: {
    "share": resolve('src/share'),
    "src": resolve('src'),
  }
};
module.exports = config;