  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    target: 'node',
    mode: 'development',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index.js',
      library: 'Array2d',
      libraryTarget: 'umd',
      globalObject: 'this'
    }
  }