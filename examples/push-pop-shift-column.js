const Array2d = require('../index.js')

const matrix = new Array2d(10, 10)
matrix.fill(0)

console.log(matrix.pushColumn([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))
console.log(matrix.unshiftColumn([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))

console.log(matrix)

console.log('|\n|\nv')

console.log(matrix.popColumn([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))
console.log(matrix.shiftColumn([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))

console.log(matrix)
