const path = require('path');
const resolve = require('./util').resolve;

const config = {
  alias: {
    "share": resolve('src/share'),
  }
};
module.exports = config;