const Array2d = require('../index.js')

const matrix1 = new Array2d(3, 4).fill(1)
const matrix2 = new Array2d(3, 5).fill(2)
const matrix3 = new Array2d(3, 6).fill(3)
const matrix4 = new Array2d(3, 7).fill(4)

console.log(matrix1.concatHorizontal(matrix2, matrix3, matrix4))

const matrix5 = new Array2d(1, 3).fill(1)
const matrix6 = new Array2d(2, 3).fill(2)
const matrix7 = new Array2d(4, 3).fill(3)
const matrix8 = new Array2d(8, 3).fill(4)

console.log(matrix5.concatVertical(matrix6, matrix7, matrix8))