const path = require('path')

function resolve(src) {
  return path.join(__dirname, '..', src);
}

module.exports = {
  resolve
}