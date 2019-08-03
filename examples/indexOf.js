const Array2d = require('../src/index.js')

const matrix = new Array2d(10, 5).fill(0)

matrix[1][4] = 1

console.log(matrix.indexOf(1))
