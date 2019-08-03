const Array2d = require('../src/index.js')

const matrix = new Array2d(10, 10)
matrix.fill(0)
matrix.fill(1, 1, 1, 9, 9)

console.log(matrix)
