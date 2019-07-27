const Array2d = require('../index.js')

const matrix1 = new Array2d(3, 4).fill(1)
const matrix2 = new Array2d(3, 5).fill(2)
const matrix3 = new Array2d(3, 6).fill(3)
const matrix4 = new Array2d(3, 7).fill(4)

console.log(matrix1.concatHorizontal(matrix2, matrix3, matrix4))