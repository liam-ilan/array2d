const Array2d = require('../index.js')

const matrix = new Array2d(10, 10).fill(0).map((item, y, x) => {return y * x})
matrix.pushColumn([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
console.log(matrix._getData())