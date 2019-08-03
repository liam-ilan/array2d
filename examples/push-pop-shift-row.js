const Array2d = require('../src/index.js')

const matrix = new Array2d(10, 10)
matrix.fill(0)

console.log(matrix.pushRow([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))
console.log(matrix.unshiftRow([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))

console.log(matrix)

console.log('|\n|\nv')

console.log(matrix.popRow([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))
console.log(matrix.shiftRow([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))

console.log(matrix)
