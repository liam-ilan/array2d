const Array2d = require('../src/index.js')

const matrix1 = new Array2d(10, 10).fill(1)

console.log('matrix1 < 2 ===', matrix1.every((item) => item < 2))

const matrix2 = new Array2d(10, 10).fill(10)

console.log('matrix2 < 2 ===', matrix2.every((item) => item < 2))
